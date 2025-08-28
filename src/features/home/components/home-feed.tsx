/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { GET_POSTS } from '@/graphql/operation/query/posts'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery } from '@apollo/client'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import Spinner from '@/components/spinner'
import Avatar from './avatar'
import DeletePost from './delete-post'
import EditPost from './edit-post'
import PostImages from './images-post'

export default function HomeFeed() {
  const perPage = 10 // Change this to adjust how many posts to fetch per page
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {}
  )
  const [editPost, setEditPost] = useState<{
    id: string
    content: string
  } | null>(null)
  const [deletePost, setDeletePost] = useState<string | null>(null)

  const { data, loading, error, fetchMore } = useQuery<Query>(GET_POSTS, {
    variables: { page: 1, perPage },
    fetchPolicy: 'network-only',
  })

  const { data: meData } = useQuery<Query>(ME_QUERY)
  const currentUserId = meData?.meQuery?.user?.id

  // Append new posts when data changes
  useEffect(() => {
    if (data?.findAllPosts?.data) {
      const uniquePosts = Array.from(
        new Map(
          [...allPosts, ...data.findAllPosts.data].map((p) => [p.id, p])
        ).values()
      )
      setAllPosts(uniquePosts)
    }
  }, [data])

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  // Load more posts when the user scrolls to the bottom
  const loadMore = async () => {
    if (!data?.findAllPosts?.meta?.next) return // no more pages
    const nextPage = page + 1
    setPage(nextPage)

    await fetchMore({
      variables: { page: nextPage, perPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
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
  }

  if (loading && page === 1) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (allPosts.length === 0)
    return <p className='text-center'>No posts available</p>

  return (
    <div className='mt-4 space-y-4'>
      {allPosts.map((post) => {
        const isExpanded = expandedPosts[post.id]
        const user = post.user
        const profile = user?.profile

        return (
          <Card key={post.id} className='rounded-2xl border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex flex-row items-center gap-4'>
                <Avatar avatarUrl={profile?.avatar ?? undefined} size={60} />
                <div className='flex-1'>
                  <p className='text-lg font-semibold'>
                    {profile?.lastName}, {profile?.firstName}
                  </p>
                  <p className='text-xs text-gray-400'>
                    Posted on{' '}
                    {new Date(post.datePosted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {user?.id === currentUserId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon'>
                        <MoreHorizontal className='h-5 w-5' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-32'>
                      <DropdownMenuItem
                        onClick={() =>
                          setEditPost({ id: post.id, content: post.content })
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletePost(post.id)}
                        className='text-red-600'
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className='space-y-2'>
              <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
                {post.content}
              </p>
              {post.content.length > 100 && (
                <button
                  className='text-xs text-blue-600'
                  onClick={() => toggleExpand(post.id)}
                >
                  {isExpanded ? 'See less' : 'See more'}
                </button>
              )}
              <PostImages images={post.images ?? []} />
            </CardContent>
          </Card>
        )
      })}

      {loading && page > 1 && (
        <div className='my-4 flex justify-center'>
          <Spinner />
        </div>
      )}

      {data?.findAllPosts?.meta?.next && (
        <div className='mt-4 flex justify-center'>
          <Button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {editPost && (
        <EditPost
          postId={editPost.id}
          initialContent={editPost.content}
          open={!!editPost}
          onClose={() => setEditPost(null)}
        />
      )}

      {deletePost && (
        <DeletePost
          postId={deletePost}
          open={!!deletePost}
          onClose={() => setDeletePost(null)}
        />
      )}
    </div>
  )
}
