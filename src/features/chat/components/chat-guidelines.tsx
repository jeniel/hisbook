import { useState } from 'react'
import { Info, CheckCircle, AlertCircle, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

interface ChatbotGuidelinesDialogProps {
  initialOpen?: boolean
}

export default function ChatbotGuidelinesDialog({
  initialOpen = false,
}: ChatbotGuidelinesDialogProps) {
  const [open, setOpen] = useState(initialOpen)

  const guidelines = [
    {
      icon: <BookOpen className='h-5 w-5 text-yellow-500' />,
      title: 'Ask clearly',
      desc: 'Submit questions about hospital information, policies, rules, procedures, or operational guidelines.',
    },
    {
      icon: <CheckCircle className='h-5 w-5 text-green-500' />,
      title: 'Context matters',
      desc: 'The chatbot currently understands content related to hospital basic information, workplace policies, dress code, ID requirements, and internal systems.',
    },
    {
      icon: <AlertCircle className='h-5 w-5 text-red-500' />,
      title: 'Stay relevant',
      desc: 'Avoid unrelated questions for better results.',
    },
    {
      icon: <Clock className='h-5 w-5 text-blue-500' />,
      title: 'Future updates',
      desc: 'New content and departments will be added gradually, expanding the chatbot’s knowledge.',
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='lg' className='flex items-center gap-2'>
          <Info className='h-5 w-5' />
          How To Use
        </Button>
      </DialogTrigger>

      <DialogContent
        className='max-h-[90vh] max-w-3xl overflow-y-auto p-6'
        aria-describedby={undefined}
      >
        <div className='flex items-center gap-3'>
          <Info className='h-8 w-8 text-purple-500' />
          <h1 className='text-xl md:text-2xl font-bold'>ACE-istant Guide</h1>
        </div>

        <div className='mt-4 text-md md:text-lg'>
          <p className='mb-4 text-lg md:text-xl font-medium'>
            Welcome to the ACE Chatbot! Here’s how to use it effectively:
          </p>
          <ul className='space-y-4'>
            {guidelines.map((item, index) => (
              <li key={index} className='flex items-start gap-3'>
                <span className='mt-1'>{item.icon}</span>
                <div>
                  <p className='font-semibold'>{item.title}</p>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className='mt-6 flex justify-end'>
          <Button variant='destructive' onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
