import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_USER } from '@/graphql/operation/mutation/user'
import { FIND_ALL_DEPARTMENTS_IN_DROPDOWN } from '@/graphql/operation/query/department'
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
  description: string
  id: string
  name: string
}

// Validation Schema (role removed)
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function SignUp() {
  const [open, setOpen] = useState(false)

  const [createUser] = useMutation<Mutation>(CREATE_USER)

  const { data: deptData } = useQuery(FIND_ALL_DEPARTMENTS_IN_DROPDOWN)
  const departments = deptData?.findAllForDropdown || []

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      department: '',
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
            role: ['USER'], // default role (no dropdown needed)
            departmentName: data.department,
          },
        },
      })

      toast.success('Signing up is successful!')
      form.reset()
      setOpen(false) // close modal after success
    } catch (_error) {
      toast.error('Failed to sign up')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='flex w-full items-center gap-2 font-semibold'
          variant='outline'
        >
          <UserPlus className='h-5 w-5 text-blue-500' />
          Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Sign Up Here</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-4'>
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
                      <SelectContent className='max-h-80 overflow-y-auto'>
                        {departments.map((dept: Department) => (
                          <SelectItem key={dept.id} value={dept.name}>
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
            </div>
            {/* Submit */}
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='flex items-center gap-2'
                variant={'outline'}
              >
                <SquareCheckBig className='h-4 w-4 text-green-500' />
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
