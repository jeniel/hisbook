import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
                                    <TableCell>Edit | View</TableCell>
                                </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
    )
}