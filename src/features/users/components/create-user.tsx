/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_USER } from "@/graphql/operation/mutation/user"
import { Mutation } from "@/graphql/codegen/graphql"
import { FIND_ALL_DEPARTMENTS } from "@/graphql/operation/query/department"

// Input Validation
const FormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm Password is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  role: z.string().min(1, { message: "Role is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export default function CreateUser() {
  const [createUser, { loading }] = useMutation<Mutation>(CREATE_USER)
  const { data: deptData } = useQuery(FIND_ALL_DEPARTMENTS);

  // Roles and Departments
  const departments = deptData?.findAllDepartments?.data || [];
  const roles = ["USER", "ADMIN"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      role: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createUser({
        variables: {
          payload: {
            email: data.email,
            username: data.username,
            password: data.password,
            role: [data.role],
            departmentName: data.department,
          },
        },
      })

      toast.success("User Created Successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to create user")
    }
  }

  return (
    <div>
      <p className="font-semibold text-lg">Create User</p>
      <p className="text-sm italic mb-4">Note: IT staff are only allowed Edit and Create Users</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
              { name: "email", label: "E-mail", type: "text", placeholder: "Enter email" },
              { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
              { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter password" },
            ].map(({ name, label, type, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof z.infer<typeof FormSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Department Select */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dept: any) => (
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
