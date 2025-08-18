import { useState } from 'react'
import { Query } from '@/graphql/codegen/graphql'
import { GET_POSTS } from '@/graphql/operation/query/posts'
import { useQuery } from '@apollo/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function HomeFeed() {
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {}
  )
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

  // sort descending by datePosted
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
                <div>
                  <p className='text-lg font-semibold'>
                    {profile?.lastName}
                    {','} {profile?.firstName}
                  </p>
                  <p className='text-sm text-gray-500'>@{user?.username}</p>
                  <p className='text-sm text-gray-500'>
                    {department?.name}
                    {' - '}
                    {department?.description}
                  </p>
                  <p className='text-xs text-gray-400'>
                    {new Date(post.datePosted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
                {post.content}
              </p>

              {/* Optional "See more" toggle */}
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
    </div>
  )
}
