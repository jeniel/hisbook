import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FIND_ALL_USER } from "@/graphql/operation/query/user";
import { Query } from "@/graphql/codegen/graphql";
import { useQuery } from "@apollo/client";
import DeleteUser from "./delete-user";
import EditUser from "./edit-user";

export default function ViewUsers() {
  const { loading, error, data, refetch } = useQuery<Query>(FIND_ALL_USER, {
    variables: { page: 1, perPage: 10 },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const Users = data?.findAllUsers?.data || [];

  return (
    <div>
      <p className="font-semibold text-lg">All Users</p>
      <p className="text-sm italic mb-4">
        Note: IT staff are only allowed Edit and Create Users
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Users.map((user, index: number) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.profile?.firstName}{" "}{user.profile?.lastName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.department?.name ?? "—"}</TableCell>
              <TableCell className="flex flex-row items-center space-x-2">
                <EditUser user={user} onUpdated={() => refetch()}/>
                <DeleteUser
                    user={{ id: user.id, username: user.username }}
                    onDelete={() => refetch()}
                />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
