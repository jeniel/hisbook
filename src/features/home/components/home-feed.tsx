import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { GET_POSTS } from '@/graphql/operation/query/posts'
import { useQuery } from '@apollo/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import DeletePost from './delete-post'
import EditPost from './edit-post'

export default function HomeFeed() {
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {}
  )
  const [editPost, setEditPost] = useState<{
    id: string
    content: string
  } | null>(null)
  const [deletePost, setDeletePost] = useState<string | null>(null)

  const variables = { page: 1, perPage: 10 }
  const { data, loading, error } = useQuery<Query>(GET_POSTS, {
    variables,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  })

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>Error: {error.message}</p>

  const posts = [...(data?.findAllPosts?.data || [])].sort(
    (a, b) =>
      new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  )

  if (posts.length === 0) {
    return <p className='text-center'>No posts available</p>
  }

  return (
    <div className='mt-4 space-y-4'>
      {posts.map((post) => {
        const isExpanded = expandedPosts[post.id]
        const user = post.user
        const profile = user?.profile
        const department = user?.department

        return (
          <Card key={post.id} className='rounded-2xl border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex flex-row items-center gap-4'>
                <img
                  src='./images/ace.png'
                  alt='User Avatar'
                  className='h-16 w-16 rounded-full object-cover'
                />
                <div className='flex-1'>
                  <p className='text-lg font-semibold'>
                    {profile?.lastName}, {profile?.firstName}
                  </p>
                  <p className='text-sm text-gray-500'>@{user?.username}</p>
                  <p className='text-sm text-gray-500'>
                    {department?.name} - {department?.description}
                  </p>
                  <p className='text-xs text-gray-400'>
                    {new Date(post.datePosted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Action buttons */}
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() =>
                      setEditPost({ id: post.id, content: post.content })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    size='sm'
                    onClick={() => setDeletePost(post.id)}
                  >
                    Delete
                  </Button>
                </div>
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
            </CardContent>
          </Card>
        )
      })}

      {/* Modals */}
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
