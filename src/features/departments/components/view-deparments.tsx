import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import EditDepartment from "./edit-department"

const sampleData = [
    {
        id : "1",
        no : "1",
        name : "MIS",
        description : "Management Information System"
    },
    {
        id : "2",
        no : "2",
        name : "HR",
        description : "Human Resources"
    },
]

export default function ViewDepartments() {
    return (
        <div>
                    <p className="font-semibold">All Departments</p>
                
                    {/* View Users */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sampleData.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell>{department.no}</TableCell>
                                    <TableCell>{department.name}</TableCell>
                                    <TableCell>{department.description}</TableCell>
                                    <TableCell className="flex flex-row items-center space-x-2">
                                        <EditDepartment department={department}/>
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