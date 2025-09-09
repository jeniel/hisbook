import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PencilLine } from 'lucide-react'
import { useFeed } from '../hooks/useFeed'

// ✅ Validation schema
const FormSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
})

export default function CreatePost() {
  const [files, setFiles] = useState<File[]>([]) // store selected files
  const { createPost, createLoading } = useFeed()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const success = await createPost({
      content: data.content,
      files,
    })

    if (success) {
      form.reset()
      setFiles([]) // reset file input
    }
  }

  return (
    <Card>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="What's on your mind?" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between'>
              {/* File input */}
              <div>
                <div className='mb-2'>
                  <p className='text-muted-foreground text-sm'>
                    Add Images/Videos
                  </p>
                  <p className='text-muted-foreground self-end text-xs italic'>
                    Maximum of 15 Images Only
                  </p>
                </div>
                <Input
                  type='file'
                  accept='image/*'
                  multiple
                  className='max-w-80'
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files))
                    }
                  }}
                />
                {files.length > 0 && (
                  <p className='text-muted-foreground mt-1 text-xs'>
                    {files.length} file(s) selected
                  </p>
                )}
              </div>

              <Button variant={'outline'} disabled={createLoading}>
                <PencilLine className='text-blue-500' />
                {createLoading ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
