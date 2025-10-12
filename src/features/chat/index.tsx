import { MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ChatbotGuidelinesDialog from './components/chat-guidelines'
import ChatHistory from './components/chat-history'
import ChatInput from './components/chat-input'
import { useChat } from './hooks/useChat'

export default function ChatUI() {
  // Chat Webhook for n8n
  const { messages, isLoading, sendMessage } = useChat(
    'https://n8n.acemcbohol.ph/webhook/75cc266d-c92c-4ec6-b425-800ac12aa62e/chat'
  )

  // Handle message submission from ChatInput
  const handleSubmit = async (text: string) => {
    if (!text.trim()) return
    await sendMessage(text)
  }

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
            <MessageCircle className='h-10 w-10 text-purple-500' />
            Chat
          </h1>
          <p className='text-muted-foreground text-sm'>Chat Our AI Assistant</p>
        </div>

        {/* Chatbot Guidelines Dialog */}
        <ChatbotGuidelinesDialog initialOpen={true} />
      </div>

      <Card className='mb-4'>
        <CardContent>
          {/* Chat History */}
          <div className='overflow-y-auto'>
            <ChatHistory chatHistory={messages} isLoading={isLoading} />
          </div>

          {/* Chat Input */}
          <div className='border-t pt-2'>
            <ChatInput onSubmit={handleSubmit} loading={isLoading} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
