/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EDIT_TICKET } from "@/graphql/operation/mutation/ticket";
import { Mutation } from "@/graphql/codegen/graphql";

type WorkTicketProps = {
  ticket: any;
  onUpdated?: () => void;
};

export default function WorkTicket({ ticket, onUpdated }: WorkTicketProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [updatedBy, setUpdatedBy] = useState(""); // Added updatedBy state

  const [updateTicket, { loading }] = useMutation<Mutation>(EDIT_TICKET);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Generic change handler if you want to extend easily
  const handleChange = (field: string, value: string) => {
    if (field === "updatedBy") {
      setUpdatedBy(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const screenshot = preview ?? null;

      await updateTicket({
        variables: {
          updateMissedLogoutTicketId: ticket.id,
          payload: {
            missedAt: ticket.missedAt,
            floor: ticket.floor,
            screenshot,
            status,
            updatedBy,
          },
        },
      });

      toast.success("Ticket updated successfully");
      if (onUpdated) onUpdated();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update ticket");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Work on Ticket
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Work on Ticket</DialogTitle>
          <DialogDescription>Review and update this ticket.</DialogDescription>
        </DialogHeader>

        {/* Status Dropdown */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload with Preview */}
        <div className="space-y-2">
          <Label>Attach CCTV Screenshot</Label>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {file && (
            <p className="text-xs text-muted-foreground">Selected: {file.name}</p>
          )}
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="CCTV Screenshot Preview"
                className="max-h-48 rounded border"
              />
            </div>
          )}
        </div>

        {/* Reviewed By */}
        <div className="space-y-2">
          <Label>Reviewed By</Label>
          <Input
            value={updatedBy}
            onChange={(e) => handleChange("updatedBy", e.target.value)}
            placeholder="Enter your Name"
          />
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
