/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { GET_POST_BY_USER } from '@/graphql/operation/query/posts'
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
import Avatar from '@/features/home/components/avatar'
import DeletePost from '@/features/home/components/delete-post'
import EditPost from '@/features/home/components/edit-post'
import PostImages from '@/features/home/components/images-post'

export default function ProfileFeed() {
  const perPage = 10
  const [userPosts, setUserPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({})
  const [editPost, setEditPost] = useState<{ id: string; content: string } | null>(null)
  const [deletePost, setDeletePost] = useState<string | null>(null)

  // Get current user
  const { data: meData, loading: meLoading } = useQuery(ME_QUERY)
  const currentUserId = meData?.meQuery?.user?.id

  // Fetch posts created by current user
  const { data, loading, error, fetchMore } = useQuery(GET_POST_BY_USER, {
    variables: { userId: currentUserId ?? '', page: 1, perPage },
    skip: !currentUserId,
    fetchPolicy: 'network-only',
  })

  // Append posts safely
  useEffect(() => {
    if (!data?.findAllPostsCreatedByUser?.data?.length) return

    setUserPosts((prev) => {
      const combined = [...prev, ...data.findAllPostsCreatedByUser.data]
      const unique = Array.from(new Map(combined.map((p) => [p.id, p])).values())
      return unique
    })
  }, [data])

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const loadMore = async () => {
    if (!data?.findAllPostsCreatedByUser?.meta?.next) return
    const nextPage = page + 1
    setPage(nextPage)

    await fetchMore({
      variables: { userId: currentUserId, page: nextPage, perPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          findAllPostsCreatedByUser: {
            ...fetchMoreResult.findAllPostsCreatedByUser,
            data: [
              ...prev.findAllPostsCreatedByUser.data,
              ...fetchMoreResult.findAllPostsCreatedByUser.data,
            ],
          },
        }
      },
    })
  }

  if (loading || meLoading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>
  if (!userPosts.length) return <p className='text-center'>You have no posts yet.</p>

  return (
    <div className='mt-4 space-y-4'>
      {userPosts.map((post) => {
        const user = post.user
        const profile = user?.profile
        const department = user?.department
        const isExpanded = expandedPosts[post.id]

        return (
          <Card key={post.id} className='rounded-2xl border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex flex-row items-center gap-4'>
                <Avatar avatarUrl={profile?.avatar ?? undefined} size={80} />
                <div className='flex-1'>
                  <p className='text-lg font-semibold'>
                    {profile?.lastName}, {profile?.firstName}
                  </p>
                  <p className='text-sm text-gray-500'>@{user?.username}</p>
                  <p className='text-sm text-gray-500'>
                    {department?.name} - {department?.description}
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

      {data?.findAllPostsCreatedByUser?.meta?.next && (
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
