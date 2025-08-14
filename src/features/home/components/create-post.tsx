import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Pen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function CreatePost() {
  const [message, setMessage] = useState("")
  const [mediaFiles, setMediaFiles] = useState<File[]>([])

  function handleMediaChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files))
    }
  }

  function handlePost() {
    if (!message.trim()) {
      return alert("Message is required.")
    }

    const formData = new FormData()
    formData.append("message", message)

    mediaFiles.forEach((file, index) => {
      formData.append("media", file) // or use `media[]` if backend expects an array
    })

    // Submit formData to backend or log it
    console.log("Posting message:", message)
    console.log("Files:", mediaFiles)

  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex flex-row gap-2 items-center">
          <Pen />
          Create Post
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          placeholder="Type your message here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaChange}
        />

        <div className="flex gap-2 justify-end">
          <Button onClick={handlePost}>Post</Button>
        </div>
      </CardContent>
    </Card>
  )
}
