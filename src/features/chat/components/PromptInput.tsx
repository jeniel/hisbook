import { useRef, useState } from 'react'
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'

const SUBMITTING_TIMEOUT = 200
const STREAMING_TIMEOUT = 2000

const Example2 = () => {
  const [text, setText] = useState<string>('')
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const stop = () => {
    console.log('Stopping request...')

    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setStatus('ready')
  }

  const handleSubmit = (message: PromptInputMessage) => {
    // If currently streaming or submitted, stop instead of submitting
    if (status === 'streaming' || status === 'submitted') {
      stop()
      return
    }

    const hasText = Boolean(message.text)
    const hasAttachments = Boolean(message.files?.length)

    if (!(hasText || hasAttachments)) {
      return
    }

    setStatus('submitted')

    console.log('Submitting message:', message)

    setTimeout(() => {
      setStatus('streaming')
    }, SUBMITTING_TIMEOUT)

    timeoutRef.current = setTimeout(() => {
      setStatus('ready')
      timeoutRef.current = null
    }, STREAMING_TIMEOUT)
  }

  return (
    <div className='mb-4'>
      <PromptInput globalDrop multiple onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
            value={text}
          />
        </PromptInputBody>
        <PromptInputSubmit status={status} />
      </PromptInput>
    </div>
  )
}

export default Example2
