import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import Spinner from '@/components/spinner'
import { type ChatMessage } from '../hooks/useChat'

interface ChatHistoryProps {
  chatHistory: ChatMessage[]
  isLoading?: boolean
}

const ChatHistory = ({ chatHistory, isLoading }: ChatHistoryProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // ✅ Automatically scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory, isLoading])

  const EmptyState = () => (
    <div className='flex h-full items-center justify-center'>
      <div className='flex flex-col items-center justify-center py-30 text-center md:py-50'>
        <div className='mb-3 rounded-full bg-gray-100 p-3'>
          <img src='./images/ai_logo.png' alt='AI Logo' className='h-30' />
        </div>
        <p className='text-xl text-muted-foreground'>
          Start a conversation with ACE-istant
        </p>
      </div>
    </div>
  )

  return (
    <div className='flex h-[70vh] flex-col'>
      <ScrollArea className='flex-1'>
        {chatHistory.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='space-y-4'>
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <Avatar className='h-12 w-12 bg-gray-100'>
                    <AvatarImage src='/images/ai_logo.png' alt='AI' />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`prose prose-p:my-1 prose-ul:my-1 prose-li:my-0 max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground prose-invert dark:text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {msg.role === 'user' && (
                  <Avatar className='h-12 w-12 bg-gray-200'>
                    <AvatarImage src='/images/user_logo.png' alt='User' />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {/* Assistant typing indicator */}
            {isLoading && (
              <div className='flex items-center justify-start gap-4'>
                <Avatar className='h-12 w-12 bg-gray-100'>
                  <AvatarImage src='/images/ai_logo.png' alt='AI' />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <Spinner size={24} />
                </div>
              </div>
            )}
            {/* ✅ This invisible div ensures auto scroll target */}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default ChatHistory
