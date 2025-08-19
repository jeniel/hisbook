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
import { ME_QUERY } from '@/graphql/operation/query/user'; // Use this ME Query to get the userId
import { Query } from '@/graphql/codegen/graphql';

export default function MyTickets() {
  const { loading: meLoading, error: meError, data: meData } = useQuery<Query>(ME_QUERY);
  const userId = meData?.meQuery?.user?.id;

  const {
    loading: ticketsLoading,
    error: ticketsError,
    data: ticketsData,
  } = useQuery<Query>(FIND_ALL_MISSED_LOGOUT_TICKETS_BY_USER, {
    variables: { userId, page: 1, perPage: 10 },
    skip: !userId,
    fetchPolicy: 'cache-and-network',
  });

  if (meLoading) return <p>Loading user...</p>;
  if (meError) return <p>Error loading user: {meError.message}</p>;

  if (ticketsLoading) return <p>Loading tickets...</p>;
  if (ticketsError) return <p>Error loading tickets: {ticketsError.message}</p>;

  const tickets = ticketsData?.findTicketsByUser?.data || [];

  return (
    <div>
      <p className="font-semibold">My Submitted Tickets</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
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
              <TableCell>
                {ticket.createdBy?.profile
                  ? `${ticket.createdBy.profile.firstName} ${ticket.createdBy.profile.lastName}`
                  : "Unknown"}
              </TableCell>
              <TableCell>{ticket.subject || '-'}</TableCell>
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
