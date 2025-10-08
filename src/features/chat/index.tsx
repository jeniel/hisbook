import { MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Example from './components/Conversation'
import Example2 from './components/PromptInput'

const Chat = () => {
  return (
    <div>
      <div className="mb-4">
        <h1 className='mb-2 flex items-center gap-2 text-3xl font-semibold'>
          <MessageCircle className='h-10 w-10 text-purple-500' />
          Chat
        </h1>
        <p className='text-muted-foreground text-sm'>
          Ask Questions of Our AI Agent Here
        </p>
      </div>
      <Card>
        <CardContent className="max-w-6xl mx-auto w-full">
          <Example />
          <Example2 />
        </CardContent>
      </Card>
    </div>
  )
}

export default Chat
