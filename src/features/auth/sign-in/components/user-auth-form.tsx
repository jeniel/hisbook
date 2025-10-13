/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { SIGN_IN } from '@/graphql/operation/mutation/user'
import { useMutation } from '@apollo/client'
import _ from 'lodash'
import { LogIn } from 'lucide-react'
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
  username: z.string().min(1, { message: 'Please enter your username' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(1, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [login, { loading }] = useMutation<Mutation>(SIGN_IN)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    login({
      variables: {
        signInInput: {
          username: data.username,
          password: data.password,
        },
      },
      onCompleted: async (data) => {
        console.log('data == >', data)

        // Wait a bit for cookies to be set
        await new Promise((resolve) => setTimeout(resolve, 100))

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

        // If you want a global error not tied to a field:
        form.setError('root', {
          type: 'server',
          message: 'Invalid username or password',
        })
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
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
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
            </FormItem>
          )}
        />

        {/* Global error message */}
        {form.formState.errors.root && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.root.message}
          </p>
        )}

        <Button className='mt-2 flex items-center gap-2' disabled={loading}>
          <LogIn className='h-4 w-4' />
          Login
        </Button>
      </form>
    </Form>
  )
}
