import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample Ticket Data
const sampleTickets = [
  {
    id: 1,
    no: 1,
    name: "ACE",
    date: "2025-08-07",
    time: "08:00 AM to 09:00 AM",
    location: "B1",
    status: "Pending",
  },
  {
    id: 2,
    no: 2,
    name: "ACE",
    date: "2025-08-05",
    time: "07:50 AM to 09:00 AM",
    location: "HR",
    status: "Approved",
  },
  {
    id: 3,
    no: 3,
    name: "ACE",
    date: "2025-08-05",
    time: "07:50 AM to 08:00 AM",
    location: "Lab",
    status: "Completed",
  },
];


export default function MyTickets() {
    return (
        <div>
                    <p className="font-semibold">My Submitted Tickets</p>
       
                    {/* View Tickets */}
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
                            {sampleTickets.map((tickets) => (
                            <TableRow key={tickets.id}>
                                <TableCell>{tickets.no}</TableCell>
                                <TableCell>{tickets.name}</TableCell>
                                <TableCell>{tickets.date}</TableCell>
                                <TableCell>{tickets.time}</TableCell>
                                <TableCell>{tickets.location}</TableCell>
                                <TableCell>{tickets.status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
    )
}