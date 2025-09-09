import React from 'react'
import { CreatePost } from './create-post'
import { TimelinePost } from './timeline-post'

// Sample data for demonstration
const samplePosts = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to amaze me. 🏔️',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baef493e?w=600&h=400&fit=crop'
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    privacy: 'public' as const,
    likes: 24,
    comments: 5,
    shares: 2,
    isLiked: true
  },
  {
    id: '2',
    author: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Cooking experiment successful! 👩‍🍳 Made homemade pasta from scratch and it turned out amazing. Recipe in the comments!',
    images: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop'
    ],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    privacy: 'friends' as const,
    likes: 18,
    comments: 12,
    shares: 1,
    isLiked: false
  },
  {
    id: '3',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Great day at the office! Our team just launched a new project that we\'ve been working on for months. Feeling proud and excited for what\'s next! 🚀',
    images: [],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    privacy: 'public' as const,
    likes: 32,
    comments: 8,
    shares: 4,
    isLiked: true
  },
  {
    id: '4',
    author: {
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Weekend vibes! ☀️ Spent the day at the beach with friends. Perfect weather, good company, and lots of laughs.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop'
    ],
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    privacy: 'friends' as const,
    likes: 45,
    comments: 15,
    shares: 3,
    isLiked: false
  },
  {
    id: '5',
    author: {
      name: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    content: 'Just finished reading an incredible book! "The Seven Habits of Highly Effective People" - highly recommend it to anyone looking to improve their personal and professional life. 📚',
    images: [],
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    privacy: 'public' as const,
    likes: 12,
    comments: 3,
    shares: 1,
    isLiked: true
  }
]

export const Timeline: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Create Post Section */}
      <CreatePost 
        userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        userName="You"
      />
      
      {/* Posts Feed */}
      <div className="space-y-4">
        {samplePosts.map((post) => (
          <TimelinePost
            key={post.id}
            {...post}
          />
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center mt-8">
        <div className="text-gray-500 text-sm">
          You've caught up with all recent posts
        </div>
      </div>
    </div>
  )
}
