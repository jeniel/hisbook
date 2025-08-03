import { Toaster as Sonner, ToasterProps } from 'sonner'
import { useTheme } from '@/context/theme-context'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position='top-right'
      className='toaster group'
      toastOptions={{
        style: {
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: '!bg-green-600 !text-white !border-green-500',
          error: '!bg-red-600 !text-white !border-red-500',
          info: '!bg-blue-600 !text-white !border-blue-500',
          warning: '!bg-yellow-600 !text-white !border-yellow-500',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
