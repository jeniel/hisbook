import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ThumbsUp, 
  MoreHorizontal,
  Globe,
  Users,
  Lock
} from 'lucide-react'

interface PostProps {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  images?: string[]
  timestamp: string
  privacy: 'public' | 'friends' | 'private'
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
}

export const TimelinePost: React.FC<PostProps> = ({
  author,
  content,
  images = [],
  timestamp,
  privacy,
  likes,
  comments,
  shares,
  isLiked = false
}) => {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const getPrivacyIcon = () => {
    switch (privacy) {
      case 'public':
        return <Globe className="size-3" />
      case 'friends':
        return <Users className="size-3" />
      case 'private':
        return <Lock className="size-3" />
      default:
        return <Globe className="size-3" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d`
    }
  }

  return (
    <Card className="w-full mb-4">
      <CardContent className="pt-4">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {author.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <span>{formatTime(timestamp)}</span>
                <span>·</span>
                {getPrivacyIcon()}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {content}
          </p>
        </div>

        {/* Post Images */}
        {images.length > 0 && (
          <div className="mb-3">
            {images.length === 1 ? (
              <img
                src={images[0]}
                alt="Post content"
                className="w-full max-h-96 object-cover rounded-lg"
              />
            ) : images.length === 2 ? (
              <div className="grid grid-cols-2 gap-1">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post content ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1">
                <img
                  src={images[0]}
                  alt="Post content 1"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="relative">
                  <img
                    src={images[1]}
                    alt="Post content 2"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {images.length > 2 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        +{images.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Engagement Stats */}
        {(likeCount > 0 || comments > 0 || shares > 0) && (
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
            <div className="flex items-center gap-2">
              {likeCount > 0 && (
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <ThumbsUp className="size-3 text-white" fill="white" />
                    </div>
                    <div className="size-5 bg-red-500 rounded-full flex items-center justify-center">
                      <Heart className="size-3 text-white" fill="white" />
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{likeCount}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              {comments > 0 && <span>{comments} comments</span>}
              {shares > 0 && <span>{shares} shares</span>}
            </div>
          </div>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="pt-0">
        <div className="flex items-center justify-around w-full">
          <Button
            variant="ghost"
            onClick={handleLike}
            className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              liked 
                ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ThumbsUp className={`size-5 ${liked ? 'fill-current' : ''}`} />
            <span className="font-medium">Like</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-2 py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <MessageCircle className="size-5" />
            <span className="font-medium">Comment</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-2 py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Share className="size-5" />
            <span className="font-medium">Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
