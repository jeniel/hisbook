"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function WorkTicket({ ticket }) {
  const [status, setStatus] = useState(ticket.status)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = () => {
    console.log({
      owner: ticket.name,
      status,
      date: ticket.date,
      time: ticket.time,
      location: ticket.location,
      file,
      reviewedBy: "IT Staff Member Name / Sir Anthony from Biomed",
    })
    // TODO: send status & file to backend
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Work on Ticket</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Work on Ticket</DialogTitle>
          <DialogDescription>
            Review and update this ticket.
          </DialogDescription>
        </DialogHeader>

        {/* Ticket Owner */}
        <div className="space-y-2">
          <Label>Ticket Owner</Label>
          <p className="border rounded-md p-2 bg-muted">{ticket.name}</p>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label>Date</Label>
          <p className="border rounded-md p-2 bg-muted">{ticket.date}</p>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label>Time</Label>
          <p className="border rounded-md p-2 bg-muted">{ticket.time}</p>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <p className="border rounded-md p-2 bg-muted">{ticket.location}</p>
        </div>

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
            <p className="text-xs text-muted-foreground">
              Selected: {file.name}
            </p>
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
          <p className="border rounded-md p-2 bg-muted">
            IT Staff Member Name / Sir Anthony From Biomed
          </p>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
