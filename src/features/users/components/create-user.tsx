import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_USER } from '@/graphql/operation/mutation/user'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { FIND_ALL_USER } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { ChevronDown, ChevronRight, SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
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

interface Department {
  id: string
  name: string
}

// Input Validation
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
      setOpen(false) // auto-close after success
    } catch (_error) {
      toast.error('Failed to create user')
    }
  }

  return (
    <Card>
      <CardContent>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='flex w-full items-center justify-between text-lg font-semibold'
            >
              <span>Create A New User</span>
              {open ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className='mt-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full space-y-6'
              >
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {[
                    {
                      name: 'username',
                      label: 'Username',
                      type: 'text',
                      placeholder: 'Enter username',
                    },
                    {
                      name: 'password',
                      label: 'Password',
                      type: 'password',
                      placeholder: 'Enter password',
                    },
                    {
                      name: 'confirmPassword',
                      label: 'Confirm Password',
                      type: 'password',
                      placeholder: 'Re-enter password',
                    },
                  ].map(({ name, label, type, placeholder }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof z.infer<typeof FormSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input
                              type={type}
                              placeholder={placeholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  {/* Department Select */}
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
                              <SelectItem key={dept.name} value={dept.name}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Role Select */}
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
                <Button variant='outline' type='submit' className='shadow-md'>
                  <SquareCheckBig className='text-green-500' /> Submit
                </Button>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
