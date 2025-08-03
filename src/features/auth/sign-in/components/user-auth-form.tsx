import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { Mutation } from '@/graphql/codegen/graphql'
import { SIGN_IN } from '@/graphql/operation/mutation/user'
import { useMutation } from '@apollo/client'
import _ from 'lodash'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = useState(false)
  const [login, { loading }] = useMutation<Mutation>(SIGN_IN)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    login({
      variables: {
        signInInput: {
          email: data.email,
          password: data.password,
        },
      },
      onCompleted: async (data) => {
        console.log('data == >', data)
        
        // Wait a bit for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Refetch authentication state instead of full page reload
        if (typeof window !== 'undefined' && (window as any).refetchAuth) {
          try {
            await (window as any).refetchAuth()
          } catch (error) {
            console.warn('Failed to refetch auth:', error)
          }
        }
        
        // Navigate to dashboard or redirect URL
        const urlParams = new URLSearchParams(window.location.search)
        const redirectUrl = urlParams.get('redirect') || '/'
        window.location.href = redirectUrl
      },
      onError: (error) => {
        console.log('error ===== >', error.message)
        // Handle login error appropriately
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={loading}>
          Login
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' type='button' disabled={loading}>
            <IconBrandGithub className='h-4 w-4' /> GitHub
          </Button>
          <Button variant='outline' type='button' disabled={loading}>
            <IconBrandFacebook className='h-4 w-4' /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
