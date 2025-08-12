import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import EditUser from "./edit-user";

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
        <div>
            <p className="font-semibold text-lg">All Users</p>
            <p className="text-sm italic mb-4">Note: IT staff are only allowed Edit and Create Users</p>
        
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
                                <TableCell className="flex flex-row items-center space-x-2">
                                        <EditUser user={user}/>
                                        <p>|</p>
                                        <Button>Delete</Button>
                                    </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        </div>
    )
}