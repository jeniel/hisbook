/* eslint-disable no-console */
import { useState, useRef } from 'react'
import { Send } from 'lucide-react'
import useMeQuery from '@/hooks/useMeQuery'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  onSubmit: (text: string) => Promise<void>
  loading: boolean
}

const ChatInput = ({ onSubmit, loading }: ChatInputProps) => {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { userId } = useMeQuery()

  const handleSubmit = async () => {
    const userMessage = text.trim()
    if (!userMessage || !userId || loading) return

    try {
      await onSubmit(userMessage)
      setText('')
      textareaRef.current?.focus()
    } catch (error) {
      console.error('Chat submission failed:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className='flex w-full items-center gap-2'>
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Ask a question...'
        disabled={loading}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        <Send />
      </Button>
    </div>
  )
}

export default ChatInput
