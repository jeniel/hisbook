import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
import useDepartments from '@/hooks/useDepartmentDropdown'
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
import useUserMutation from '@/features/users/hooks/useUserMutation'

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function SignUp() {
  const [open, setOpen] = useState(false)
  const { createUser, creating } = useUserMutation()
  const { fetchDepartments, departments } = useDepartments({
    onlySupport: false,
  })

  useEffect(() => {
    if (open) {
      fetchDepartments()
    }
  }, [open, fetchDepartments])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      department: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createUser({
        username: data.username,
        password: data.password,
        role: ['USER'], // default role
        departmentId: data.department, // pass the ID directly
      })

      toast.success('Sign up successful!')
      form.reset()
      setOpen(false)
    } catch {
      toast.error('Failed to sign up')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button
          className='flex w-full items-center gap-2 font-semibold'
          variant='outline'
        >
          <UserPlus className='h-5 w-5 text-blue-500' />
          Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent
        className='my-4 max-h-screen max-w-lg overflow-y-auto'
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Sign Up Here
          </DialogTitle>
        </DialogHeader>

        <div className='mb-4 rounded-md border border-gray-200 bg-gray-50 p-4'>
          <h3 className='mb-2 text-sm font-semibold text-gray-700'>
            Sign-Up Guide
          </h3>
          <ul className='list-inside list-disc space-y-1 text-sm text-gray-600'>
            <li>
              <strong>Username format:</strong>
              <ul className='ml-5 list-inside list-disc space-y-1 text-sm text-gray-600'>
                <li>1st letter of First Name</li>
                <li>1st letter of Middle Name</li>
                <li>Full Last Name.</li>
                <li>
                  <em>Example:</em> Ronald L. Ramiro → <code>rlramiro</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Password:</strong> minimum 6 characters
            </li>
            <li>
              <strong>Department:</strong> select your designated department
              from the dropdown
            </li>
            <li>
              After signing up, update your profile with your full name and
              other details
            </li>
          </ul>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Account Info */}
            <div className='grid gap-4'>
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
                  <FormItem className='w-full sm:w-auto'>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full truncate'>
                          <SelectValue placeholder='Select department' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='max-h-60 overflow-y-auto'>
                        {departments.map((dept) => (
                          <SelectItem
                            key={dept.id}
                            value={dept.id}
                            className='max-w-full truncate sm:max-w-[28rem]'
                            title={dept.name}
                          >
                            {dept.name}
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

            <Button
              type='submit'
              className='flex w-full items-center gap-2 font-semibold'
              disabled={creating}
            >
              <SquareCheckBig className='h-4 w-4' />
              {creating ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
