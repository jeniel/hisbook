/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { CREATE_TICKET } from "@/graphql/operation/mutation/ticket";
import { Mutation, Status } from "@/graphql/codegen/graphql";

// Input Validation
const TicketSchema = z.object({ 
  time: z.string().min(1, { message: "Time is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  floor: z.string().min(1, { message: "Floor is required" }),
});

export default function CreateTickets({ loggedInUsername }: { loggedInUsername: string }) {
  const [createTicket, { loading }] = useMutation<Mutation>(CREATE_TICKET);
  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      time: "",
      date: "",
      floor: "",
    },
  });

  // Change this
  const userId = 'ccd4c115-866e-4427-9424-b19ae2c6842a'; 

  async function onSubmit(data: z.infer<typeof TicketSchema>) {
    try {
      const missedAt = `${data.date}T${data.time}`;
      await createTicket({
        variables: {
          payload: {
            missedAt,
            floor: data.floor,
            screenshot: null,
            status: Status.Pending,
            createdById: userId,
          },
        },
      });

      toast.success("Ticket Created")
      form.reset();
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  }

  return (
    <div>
      <p className="font-semibold text-lg mb-4">Create Ticket</p>
      <p className="text-lg mb-4">
        <span className="font-medium">Name:</span> {loggedInUsername}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 max-w-3xl">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Time From Missed Logout</FormLabel>
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

          <div className="col-span-2 w-full">
            <Button type="submit" className="w-full mb-2" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
            <p className="text-sm italic mb-4">Note: Once Ticket is Submitted You Cannot Edit It. Please Double Check.</p>
          </div>
        </form>
      </Form>
    </div>
  );
}
