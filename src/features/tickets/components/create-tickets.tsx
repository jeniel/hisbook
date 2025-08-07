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

const TicketSchema = z.object({
  timeFrom: z.string().min(1, { message: "Start time is required" }),
  timeTo: z.string().min(1, { message: "End time is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  floor: z.string().min(1, { message: "Floor is required" }),
})

export default function CreateTickets() {
  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      timeFrom: "",
      timeTo: "",
      date: "",
      floor: "",
    },
  })

  function onSubmit(data: z.infer<typeof TicketSchema>) {
    toast("Ticket Created", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="text-white">
      <p className="font-semibold text-lg mb-4">Create Ticket</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 max-w-3xl">
          <FormField
            control={form.control}
            name="timeFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time From</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time To</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Biometrics</FormLabel>
                <FormControl>
                  <Input placeholder="8th Floor HR" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="col-span-2 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
