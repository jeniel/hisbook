/* eslint-disable no-console */
import { useState, useCallback, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { Query, Mutation } from '@/graphql/codegen/graphql'
import { GET_POSTS } from '@/graphql/operation/query/posts'
import { CREATE_POST, UPDATE_POST, DELETE_POST } from '@/graphql/operation/mutation/post'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useUpload } from '@/hooks/useUpload'

export interface CreatePostData {
  content: string
  files?: File[]
}

export interface UpdatePostData {
  postId: string
  content: string
}

export function useFeed() {
  const perPage = 10
  const [page, setPage] = useState(1)
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({})
  const { uploadFiles } = useUpload()

  // Queries
  const { data, loading, error, fetchMore, refetch } = useQuery<Query>(GET_POSTS, {
    variables: { page: 1, perPage },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  const { data: meData } = useQuery<Query>(ME_QUERY, {
    fetchPolicy: 'cache-first',
  })

  // Mutations - Remove duplicate refetch calls from onCompleted
  const [createPostMutation, { loading: createLoading }] = useMutation<Mutation>(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { page: 1, perPage } }],
    onError: (error) => {
      console.error('Failed to create post:', error)
    }
  })

  const [updatePostMutation, { loading: updateLoading }] = useMutation<Mutation>(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { page: 1, perPage } }],
    onError: (error) => {
      console.error('Failed to update post:', error)
    }
  })

  const [deletePostMutation, { loading: deleteLoading }] = useMutation<Mutation>(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { page: 1, perPage } }],
    onError: (error) => {
      console.error('Failed to delete post:', error)
    }
  })

  // Memoize posts data to prevent unnecessary re-renders
  const posts = useMemo(() => {
    return data?.findAllPosts?.data || []
  }, [data?.findAllPosts?.data])

  // Memoize current user to prevent unnecessary re-renders
  const currentUser = useMemo(() => {
    return meData?.meQuery?.user
  }, [meData?.meQuery?.user])

  // Memoize hasMore to prevent unnecessary re-renders
  const hasMore = useMemo(() => {
    return !!data?.findAllPosts?.meta?.next
  }, [data?.findAllPosts?.meta?.next])

  // Helper functions
  const toggleExpand = useCallback((postId: string) => {
    setExpandedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }, [])

  const loadMore = useCallback(async () => {
    if (!data?.findAllPosts?.meta?.next) return
    const nextPage = page + 1
    setPage(nextPage)

    try {
      await fetchMore({
        variables: { page: nextPage, perPage },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return {
            ...prev,
            findAllPosts: {
              ...fetchMoreResult.findAllPosts,
              data: [
                ...prev.findAllPosts.data,
                ...fetchMoreResult.findAllPosts.data,
              ],
            },
          }
        },
      })
    } catch (_error) {
      toast.error('Failed to load more posts')
    }
  }, [page, perPage, fetchMore, data?.findAllPosts?.meta?.next])

  // Post operations
  const createPost = useCallback(async ({ content, files = [] }: CreatePostData) => {
    try {
      const userId = currentUser?.id
      if (!userId) {
        toast.error('User not found')
        return false
      }

      // Upload files if any
      const imageUrls = files.length > 0 ? await uploadFiles(files, 'posts') : []

      const res = await createPostMutation({
        variables: {
          payload: {
            content,
            userId,
            images: imageUrls,
          },
        },
      })

      toast.success(res.data?.createPost?.message ?? 'Post created successfully')
      
      // Reset pagination to show new post
      setPage(1)
      
      return true
    } catch (_error) {
      toast.error('Failed to create post')
      return false
    }
  }, [createPostMutation, uploadFiles, currentUser?.id])

  const updatePost = useCallback(async ({ postId, content }: UpdatePostData) => {
    try {
      await updatePostMutation({
        variables: { postId, data: { content } },
      })
      toast.success('Post updated successfully')
      return true
    } catch (_error) {
      toast.error('Failed to update post')
      return false
    }
  }, [updatePostMutation])

  const deletePost = useCallback(async (postId: string) => {
    try {
      await deletePostMutation({ variables: { postId } })
      toast.success('Post deleted successfully')
      return true
    } catch (_error) {
      toast.error('Failed to delete post')
      return false
    }
  }, [deletePostMutation])

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    // Data
    posts,
    currentUser,
    hasMore,
    expandedPosts,
    
    // Loading states
    loading: loading && page === 1,
    loadingMore: loading && page > 1,
    createLoading,
    updateLoading,
    deleteLoading,
    
    // Error
    error,
    
    // Actions
    createPost,
    updatePost,
    deletePost,
    loadMore,
    toggleExpand,
    refetch,
  }), [
    posts,
    currentUser,
    hasMore,
    expandedPosts,
    loading,
    page,
    createLoading,
    updateLoading,
    deleteLoading,
    error,
    createPost,
    updatePost,
    deletePost,
    loadMore,
    toggleExpand,
    refetch,
  ])
}