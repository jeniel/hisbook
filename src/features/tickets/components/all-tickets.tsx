import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WorkTickets from "./work-tickets";
import { useQuery } from '@apollo/client';
import { FIND_ALL_MISSED_LOGOUT_TICKETS } from '@/graphql/operation/query/ticket';
import { Query } from "@/graphql/codegen/graphql";

export default function AllTickets() {
  const { loading, error, data, refetch } = useQuery<Query>(FIND_ALL_MISSED_LOGOUT_TICKETS, {
    variables: {  page: 1, perPage: 10 },
    fetchPolicy: "cache-and-network",
  });


  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error loading tickets: {error.message}</p>;

  const tickets = data?.findAllMissedLogoutTickets?.data || [];

  return (
    <div>
      <p className="font-semibold">All Submitted Tickets</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index: number) => (
            <TableRow key={ticket.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {ticket.createdBy?.profile
                  ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                  : "Unknown"}
              </TableCell>
              <TableCell>{new Date(ticket.missedAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(ticket.missedAt).toLocaleTimeString()}</TableCell>
              <TableCell>{ticket.floor}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                <WorkTickets ticket={ticket} onUpdated={() => refetch()} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
