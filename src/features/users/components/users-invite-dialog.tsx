import { SelectDropdown } from '@/components/select-dropdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Query } from '@/graphql/codegen/graphql'
import { INVITE_USER } from '@/graphql/operation/mutation/user'
import { FIND_ALL_TENANTS_OPTIONS } from '@/graphql/operation/query/tenant'
import { Toaster } from '@/utils/toast'
import { useMutation, useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconLoader,
  IconMailPlus,
  IconSend
} from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userClientTypes } from '../types'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  role: z.string().min(1, { message: 'Role is required.' }),
  tenantId: z.string().min(1, { message: 'Tenant is required.' }),
  desc: z.string().optional(),
})
type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  refetch?: () => void
}

export function UsersInviteDialog({ open, onOpenChange, refetch }: Props) {
  const { data } = useQuery<Query>(FIND_ALL_TENANTS_OPTIONS)
  const [inviteUser, { loading: inviteLoading }] = useMutation(INVITE_USER)

  const tenants = data?.findAllTenants || []

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', role: '', tenantId: '', desc: '' },
  })

  const onSubmit = (values: UserInviteForm) => {
    //form.reset()
    //showSubmittedData(values)
    //onOpenChange(false)
    console.log('Invited User:', values)
    inviteUser({
      variables: {
        inviteUserInput: {
          email: values.email,
          role: values.role,
          tenantId: values.tenantId,
        },
      },
      onCompleted: (data) => {
        console.log(data)
        Toaster({
          type: 'success',
          title: 'Success!',
          description: 'User invitation sent successfully',
        })
        form.reset()
        onOpenChange(false)
        refetch
      },
      onError: (error) => {
        Toaster({
          type: 'error',
          title: 'Error!',
          description: error.message || 'Failed to send invitation',
          duration: 3000,
          autoClose: true,
        })
      },
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center gap-2'>
            <IconMailPlus /> Invite User
          </DialogTitle>
          <DialogDescription>
            Invite new user to join your team by sending them an email
            invitation. Assign a role to define their access level.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='user-invite-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='eg: john.doe@gmail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenantId'
              render={({ field }) => (
                <FormItem className='w-full space-y-1'>
                  <FormLabel>Tenant</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select a tenant'
                    className='w-full'
                    items={tenants.map((tenant) => ({
                      label: tenant.name || tenant.id,
                      value: tenant.id,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Role</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select a role'
                    items={userClientTypes.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='desc'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none'
                      placeholder='Add a personal note to your invitation (optional)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            disabled={inviteLoading}
            type='submit'
            form='user-invite-form'
          >
            {inviteLoading ? (
              <>
                Sending Email <IconLoader className='animate-spin' />
              </>
            ) : (
              <>
                Invite User <IconSend />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
