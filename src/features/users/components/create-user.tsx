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

const FormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
})

const departments = ["MIS", "HR", "HDU"]

export default function CreateUser() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      department: "",
      contactNumber: "",
      address: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("User Created", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="text-white">
      <p className="font-semibold text-lg mb-4">Create User</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
                        { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
                        { name: "firstName", label: "First Name", type: "text", placeholder: "Juan" },
                        { name: "middleName", label: "Middle Name", type: "text", placeholder: "Santos" },
                        { name: "lastName", label: "Last Name", type: "text", placeholder: "Dela Cruz" },
                        { name: "contactNumber", label: "Contact Number", type: "text", placeholder: "09123456789" },
                        { name: "address", label: "Address", type: "text", placeholder: "123 Main St, City" },
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

                    {/* Department Select Dropdown */}
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
                                {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            <Button type="submit" className="w-full">
                Submit
            </Button>
            </form>
        </Form>
    </div>
  )
}
