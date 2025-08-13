/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { DELETE_DEPARTMENT } from "@/graphql/operation/mutation/department";
import { Mutation } from "@/graphql/codegen/graphql";

// Props
type DeleteDepartmentProps = {
  department: { id: string; name: string };
  onDelete?: () => void;
};

export default function DeleteDepartment({ department, onDelete }: DeleteDepartmentProps) {
  const [open, setOpen] = useState(false);
  const [deleteDepartment] = useMutation<Mutation>(DELETE_DEPARTMENT);

  const handleDelete = async () => {
  try {
    await deleteDepartment({
      variables: { deleteDepartmentId: department.id },
    });

    toast.error("Department deleted");
    if (onDelete) onDelete();
    setOpen(false);
  } catch (error) {
    toast.error("Failed to delete department");
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold">{department.name}</span>?  
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
