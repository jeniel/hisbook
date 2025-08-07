import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample Data
const sampleUsers = [
  {
    id: 1,
    no: 1,
    name: "IT Support",
    role: "Admin",
    department: "MIS"
  },
  {
    id: 2,
    no: 2,
    name: "Nurse",
    role: "User",
    department: "Lab"
  },
  {
    id: 3,
    no: 3,
    name: "Staff",
    role: "User",
    department: "HR"
  },
];
export default function ViewUsers() {
    return (
        <div className="text-white">
            <p className="font-semibold">All Users</p>
        
            {/* View Users */}
            <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sampleUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.no}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.department}</TableCell>
                                <TableCell>Edit | View</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        </div>
    )
}