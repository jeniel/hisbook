import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'
import DeletePost from './delete-post'
import PostCard from './post-card'
// import EditPost from './edit-post'
import { useFeed } from '../hooks/useFeed'

export default function HomeFeed() {
  // const [editPost, setEditPost] = useState<{
  //   id: string
  //   content: string
  // } | null>(null)

  const [deletePostId, setDeletePostId] = useState<string | null>(null)

  const {
    posts,
    currentUser,
    hasMore,
    expandedPosts,
    loading,
    loadingMore,
    error,
    loadMore,
    toggleExpand,
    deletePost,
    deleteLoading,
  } = useFeed()

  // Memoize callbacks to prevent unnecessary re-renders
  const handleDeletePost = useCallback((postId: string) => {
    setDeletePostId(postId)
  }, [])

  const handleCloseDelete = useCallback(() => {
    setDeletePostId(null)
  }, [])

  const handleConfirmDelete = useCallback(async (postId: string) => {
    const success = await deletePost(postId)
    if (success) {
      setDeletePostId(null)
    }
  }, [deletePost])

  const currentUserId = currentUser?.id
  const currentUserRole = currentUser?.role

  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (posts.length === 0)
    return <p className='text-center'>No posts available</p>

  return (
    <div className='mt-4 space-y-4'>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole || undefined}
          isExpanded={expandedPosts[post.id]}
          onToggleExpand={toggleExpand}
          onDeletePost={handleDeletePost}
        />
      ))}

      {loadingMore && (
        <div className='my-4 flex justify-center'>
          <Spinner />
        </div>
      )}

      {hasMore && (
        <div className='mt-4 flex justify-center'>
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* {editPost && (
        <EditPost
          postId={editPost.id}
          initialContent={editPost.content}
          open={!!editPost}
          onClose={() => setEditPost(null)}
        />
      )} */}

      {deletePostId && (
        <DeletePost
          postId={deletePostId}
          open={!!deletePostId}
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
        />
      )}
    </div>
  )
}
