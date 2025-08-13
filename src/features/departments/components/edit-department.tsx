/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UPDATE_DEPARTMENT } from "@/graphql/operation/mutation/department";
import { Mutation } from "@/graphql/codegen/graphql";

// Props
type EditDepartmentProps = {
  department: { id: string; name: string; description: string };
  onUpdated?: () => void;
};

export default function EditDepartment({ department, onUpdated }: EditDepartmentProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: department?.name || "",
    description: department?.description || "",
  });

  const [updateDepartment, { loading }] = useMutation<Mutation>(UPDATE_DEPARTMENT);
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDepartment({
        variables: {
          updateDepartmentId: department.id,
          payload: {
            name: formData.name,
            description: formData.description,
          },
        },
      });

      toast.success("Department updated");
      if (onUpdated) onUpdated();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update department");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Department Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
