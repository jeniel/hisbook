import { useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FIND_ALL_MISSED_LOGOUT_TICKETS_BY_USER } from '@/graphql/operation/query/ticket';
import { Query } from '@/graphql/codegen/graphql';

export default function MyTickets() {
  // Change this after
  const userId = 'ccd4c115-866e-4427-9424-b19ae2c6842a';

  const { loading, error, data } = useQuery<Query>(FIND_ALL_MISSED_LOGOUT_TICKETS_BY_USER, {
    variables: { userId, page: 1, perPage: 10 },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error loading tickets: {error.message}</p>;

  const tickets = data?.findTicketsByUser?.data || [];

  return (
    <div>
      <p className="font-semibold">My Submitted Tickets</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{ticket.createdBy?.username || 'Unknown'}</TableCell>
              <TableCell>{new Date(ticket.missedAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(ticket.missedAt).toLocaleTimeString()}</TableCell>
              <TableCell>{ticket.floor || '-'}</TableCell>
              <TableCell>{ticket.status || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
