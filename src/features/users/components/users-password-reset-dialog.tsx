'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconKey } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/password-input'
import { TransformedUser } from '../types'

const formSchema = z
  .object({
    userId: z.string(),
    password: z.string().transform((pwd) => pwd.trim()),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is required.',
        path: ['password'],
      })
    }

    if (password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must be at least 8 characters long.',
        path: ['password'],
      })
    }

    if (!password.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter.',
        path: ['password'],
      })
    }

    if (!password.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter.',
        path: ['password'],
      })
    }

    if (!password.match(/\d/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one number.',
        path: ['password'],
      })
    }

    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match.",
        path: ['confirmPassword'],
      })
    }
  })

type PasswordResetForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: TransformedUser
  refetch?: () => void
}

export function UsersPasswordResetDialog({
  open,
  onOpenChange,
  currentRow,
  refetch,
}: Props) {
  const form = useForm<PasswordResetForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: currentRow?.userId || '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: PasswordResetForm) => {
    console.log('Password reset submitted:', values)
    
    // TODO: Add your password reset mutation here
    // Example:
    // resetUserPassword({
    //   variables: {
    //     userId: values.userId,
    //     newPassword: values.password,
    //   },
    //   onCompleted: () => {
    //     form.reset()
    //     onOpenChange(false)
    //     refetch?.()
    //   },
    // })
    
    // For now, just close the dialog
    form.reset()
    onOpenChange(false)
    refetch?.()
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center gap-2'>
            <IconKey size={20} className='text-primary' />
            Reset Password
          </DialogTitle>
          <DialogDescription>
            Reset the password for{' '}
            <span className='font-semibold'>{currentRow?.username}</span>. The
            user will need to use this new password to log in.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[16rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='password-reset-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              {/* Hidden user ID field */}
              <FormField
                control={form.control}
                name='userId'
                render={({ field }) => (
                  <input type='hidden' {...field} />
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='e.g., S3cur3P@ssw0rd'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder='e.g., S3cur3P@ssw0rd'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            type='button'
          >
            Cancel
          </Button>
          <Button type='submit' form='password-reset-form'>
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
