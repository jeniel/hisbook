import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@/graphql/codegen/graphql'
import { UPDATE_USER } from '@/graphql/operation/mutation/user'
import { FIND_ALL_DEPARTMENTS_IN_DROPDOWN } from '@/graphql/operation/query/department'
import { useMutation, useQuery } from '@apollo/client'
import { PencilLine } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Zod Schema
const EditSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(0, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(0, { message: 'Confirm Password is required' }),
    department: z.string().min(1, { message: 'Department is required' }),
    role: z.string().min(1, { message: 'Role is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

//  Interface
interface Department {
  description: string
  id: string
  name: string
}

// Props
type EditUserProps = {
  user: User
  onUpdated?: () => void
}

export default function EditUser({ user, onUpdated }: EditUserProps) {
  const [open, setOpen] = useState(false)
  const [updateUser, { loading }] = useMutation(UPDATE_USER)

  // Roles and Departments
  const { data: deptData } = useQuery(FIND_ALL_DEPARTMENTS_IN_DROPDOWN)
  const departments = deptData?.findAllForDropdown || []
  const roles = ['USER', 'ADMIN']

  const form = useForm<z.infer<typeof EditSchema>>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      username: user?.username || '',
      password: '',
      confirmPassword: '',
      department: user?.department?.id || '',
      role: user?.role?.[0] || '',
    },
  })

  const onSubmit = async (data: z.infer<typeof EditSchema>) => {
    try {
      await updateUser({
        variables: {
          updateUserId: user.id,
          payload: {
            username: data.username,
            password: data.password,
            role: [data.role],
            departmentName: departments.find(
              (d: { id: string }) => d.id === data.department
            )?.name,
          },
        },
      })
      toast.success('User updated successfully!')
      if (onUpdated) onUpdated()
      setOpen(false)
    } catch (_error) {
      toast.error('Failed to update user')
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size='sm'>
          <PencilLine className='text-blue-500' /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Username */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter new password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm new password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={form.control}
              name='department'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select department' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='max-h-60 overflow-y-auto'>
                      {departments.map((dept: Department) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}{' '}
                          {dept.description && `- ${dept.description}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
