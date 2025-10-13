/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function useChat(webhookUrl: string, sessionId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate or reuse a session ID
  function getSessionId() {
    let id = localStorage.getItem('chatSessionId')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('chatSessionId', id)
    }
    return id
  }

  // Send Mesage
  async function sendMessage(userMessage: string) {
    if (!userMessage.trim()) return

    const newUserMessage: ChatMessage = { role: 'user', content: userMessage }
    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)
    setError(null)

    try {
      const payload = {
        sessionId: sessionId || getSessionId(),
        action: 'sendMessage',
        chatInput: userMessage,
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()

      const reply =
        data.reply ||
        data.answer ||
        data.output ||
        data.result ||
        JSON.stringify(data, null, 2)

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: reply,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  function clearChat() {
    setMessages([])
    setError(null)
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  }
}
