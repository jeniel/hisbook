import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_USER } from '@/graphql/operation/mutation/user'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { FIND_ALL_USER } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { UserPlus, SquareCheckBig } from 'lucide-react'
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

interface Department {
  id: string
  name: string
}

// Validation Schema
const FormSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password is required' }),
    department: z.string().min(1, { message: 'Department is required' }),
    role: z.string().min(1, { message: 'Role is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function CreateUser() {
  const [open, setOpen] = useState(false)

  const [createUser] = useMutation<Mutation>(CREATE_USER, {
    refetchQueries: [FIND_ALL_USER],
    awaitRefetchQueries: true,
  })

  const { data: deptData } = useQuery(FIND_ALL_DEPARTMENTS)
  const departments = deptData?.findAllDepartments?.data || []
  const roles = ['USER', 'ADMIN']

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      department: '',
      role: '',
    },
  })

  // Handle submit
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createUser({
        variables: {
          payload: {
            username: data.username,
            password: data.password,
            role: [data.role],
            departmentName: data.department,
          },
        },
      })

      toast.success('User Created Successfully!')
      form.reset()
      setOpen(false) // close modal after success
    } catch (_error) {
      toast.error('Failed to create user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex items-center gap-2 font-semibold'
          variant='outline'
        >
          <UserPlus className='h-5 w-5 text-blue-500' />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                        placeholder='Enter password'
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
                        placeholder='Re-enter password'
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select department' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept: Department) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            </div>
            {/* Submit */}
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='flex items-center gap-2'
                variant={'outline'}
              >
                <SquareCheckBig className='h-4 w-4 text-green-500' />
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
