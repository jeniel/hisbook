import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { ImageIcon, SmileIcon, MapPinIcon, UsersIcon } from 'lucide-react'

interface CreatePostProps {
  userAvatar?: string
  userName?: string
}

export const CreatePost: React.FC<CreatePostProps> = ({ 
  userAvatar, 
  userName = "Your Name" 
}) => {
  const [postText, setPostText] = useState('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handlePost = () => {
    // Handle post submission logic here
    console.log('Post content:', postText)
    console.log('Images:', selectedImages)
    setPostText('')
    setSelectedImages([])
  }

  return (
    <Card className="w-full mb-4">
      <CardContent className="pt-4">
        {/* User Input Section */}
        <div className="flex gap-3 mb-4">
          <Avatar className="size-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${userName}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="min-h-[80px] resize-none border-none bg-gray-100 dark:bg-gray-800 rounded-xl text-base placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full size-6 flex items-center justify-center hover:bg-opacity-70"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t pt-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-1 overflow-x-auto">
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors whitespace-nowrap">
                <ImageIcon className="size-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Photo/video</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap">
                <UsersIcon className="size-5 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Tag people</span>
              </Button>
              
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap">
                <SmileIcon className="size-5 text-yellow-500" />
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Feeling</span>
              </Button>
              
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap">
                <MapPinIcon className="size-5 text-red-500" />
                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Check in</span>
              </Button>
            </div>
            
            <Button 
              onClick={handlePost}
              disabled={!postText.trim() && selectedImages.length === 0}
              variant="default"
              className="px-6 py-2 font-semibold bg-[#1877F2] hover:bg-[#166FE5] text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 shrink-0"
            >
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
