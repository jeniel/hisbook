import { useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditDepartment from "./edit-department";
import { FIND_ALL_DEPARTMENTS } from "@/graphql/operation/query/department";
import { Query } from "@/graphql/codegen/graphql";
import DeleteDepartment from "./delete-department";

export default function ViewDepartments() {
  const { data, loading, error, refetch } = useQuery<Query>(FIND_ALL_DEPARTMENTS, {
    variables: { page: 1, perPage: 10 },
    fetchPolicy: "cache-and-network",
  });
  
  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const departments = data?.findAllDepartments?.data || [];

  return (
    <div>
      <p className="font-semibold">All Departments</p>

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
          {departments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No departments found
              </TableCell>
            </TableRow>
          ) : (
            departments.map((department, index) => (
              <TableRow key={department.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell className="flex flex-row items-center space-x-2">
                  <EditDepartment department={department} onUpdated={() => refetch()}/>
                  <DeleteDepartment department={department} onDelete={() => refetch()}/>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
