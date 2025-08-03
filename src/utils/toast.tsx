import { toast } from 'sonner'

type ToastType = 'success' | 'error' | 'info' | 'message'

interface ToastOptions {
  type?: ToastType
  title?: string
  description?: string
  data?: unknown
  duration?: number
  autoClose?: boolean
}

export function Toaster(
  options: ToastOptions | unknown,
  title?: string
) {
  // Handle backward compatibility - if first param is not an options object
  if (typeof options !== 'object' || options === null || Array.isArray(options) || !('type' in options)) {
    return toast.message(title || 'You submitted the following values:', {
      description: (
        <pre className='mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(options, null, 2)}</code>
        </pre>
      ),
    })
  }

  const { type = 'message', title: optionsTitle, description, data, duration, autoClose = true } = options as ToastOptions

  const toastTitle = optionsTitle || title || getDefaultTitle(type)

  // Get default duration based on type if not specified
  const toastDuration = duration ?? getDefaultDuration(type, autoClose)

  // If data is provided, show it in a code block
  const toastDescription = data ? (
    <pre className='mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4'>
      <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    </pre>
  ) : description

  // Get toast styling based on type
  const getToastStyling = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          style: {
            background: '#16a34a',
            color: '#ffffff',
            border: '1px solid #15803d',
          },
        }
      case 'error':
        return {
          style: {
            background: '#dc2626',
            color: '#ffffff',
            border: '1px solid #b91c1c',
          },
        }
      case 'info':
        return {
          style: {
            background: '#2563eb',
            color: '#ffffff',
            border: '1px solid #1d4ed8',
          },
        }
      default:
        return {}
    }
  }

  const toastOptions = {
    description: toastDescription,
    duration: autoClose ? toastDuration : Infinity,
    ...getToastStyling(type),
  }

  switch (type) {
    case 'success':
      return toast.success(toastTitle, toastOptions)
    case 'error':
      return toast.error(toastTitle, toastOptions)
    case 'info':
      return toast.info(toastTitle, toastOptions)
    default:
      return toast.message(toastTitle, toastOptions)
  }
}

function getDefaultTitle(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'Success!'
    case 'error':
      return 'Error!'
    case 'info':
      return 'Information'
    default:
      return 'Message'
  }
}

function getDefaultDuration(type: ToastType, autoClose: boolean): number {
  if (!autoClose) return Infinity
  
  switch (type) {
    case 'success':
      return 4000 // 4 seconds
    case 'error':
      return 6000 // 6 seconds (longer for errors)
    case 'info':
      return 5000 // 5 seconds
    default:
      return 4000 // 4 seconds
  }
}

// Convenience methods for easier usage
export const showSuccess = (title: string, description?: string, data?: unknown, options?: { duration?: number; autoClose?: boolean }) =>
  Toaster({ type: 'success', title, description, data, ...options })

export const showError = (title: string, description?: string, data?: unknown, options?: { duration?: number; autoClose?: boolean }) =>
  Toaster({ type: 'error', title, description, data, ...options })

export const showInfo = (title: string, description?: string, data?: unknown, options?: { duration?: number; autoClose?: boolean }) =>
  Toaster({ type: 'info', title, description, data, ...options })

export const showMessage = (title: string, description?: string, data?: unknown, options?: { duration?: number; autoClose?: boolean }) =>
  Toaster({ type: 'message', title, description, data, ...options })

