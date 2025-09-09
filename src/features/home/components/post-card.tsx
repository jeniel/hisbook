import { memo } from 'react'
import { Role } from '@/graphql/codegen/graphql'
import { MoreHorizontal } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import Avatar from './avatar'
import PostImages from './images-post'

interface PostCardProps {
  post: any
  currentUserId?: string
  currentUserRole?: Role[]
  isExpanded: boolean
  onToggleExpand: (postId: string) => void
  onDeletePost: (postId: string) => void
}

const PostCard = memo(function PostCard({
  post,
  currentUserId,
  currentUserRole,
  isExpanded,
  onToggleExpand,
  onDeletePost,
}: PostCardProps) {
  const user = post.user
  const profile = user?.profile

  return (
    <Card className='rounded-2xl border shadow-sm'>
      <CardHeader>
        <CardTitle className='flex flex-row items-center gap-4'>
          <Avatar avatarUrl={profile?.avatar ?? undefined} size={60} />
          <div className='flex-1'>
            <p className='text-lg font-semibold'>
              {profile?.lastName}, {profile?.firstName}
            </p>
            <p className='text-xs text-gray-400'>
              Posted on {formatDate(post.datePosted)}
            </p>
          </div>

          {(user?.id === currentUserId ||
            currentUserRole?.includes(Role.Admin)) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <MoreHorizontal className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-32'>
                {/* {user?.id === currentUserId && (
                  <DropdownMenuItem
                    onClick={() =>
                      setEditPost({ id: post.id, content: post.content })
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                )} */}
                <DropdownMenuItem
                  onClick={() => onDeletePost(post.id)}
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
            onClick={() => onToggleExpand(post.id)}
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}
        <PostImages images={post.images ?? []} />
      </CardContent>
    </Card>
  )
})

export default PostCard
