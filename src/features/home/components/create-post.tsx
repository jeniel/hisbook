import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_POST } from '@/graphql/operation/mutation/post'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { Pen } from 'lucide-react'
import { toast } from 'sonner'
import { useUpload } from '@/hooks/useUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// ✅ Validation schema
const FormSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
})

export default function CreatePost() {
  const [createPost] = useMutation<Mutation>(CREATE_POST)
  const { data: meData } = useQuery(ME_QUERY)
  const [files, setFiles] = useState<File[]>([]) // store selected files
  const { uploadFiles } = useUpload() // custom hook for file uploads

  const user = meData?.meQuery?.user
  const userId = user?.id

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // 1. Upload files
      const imageUrls = await uploadFiles(files, 'posts')

      // 2. Create post with content + image URLs
      const res = await createPost({
        variables: {
          payload: {
            content: data.content,
            userId,
            images: imageUrls, // array of URLs
          },
        },
      })

      toast.success(
        res.data?.createPost?.message ?? 'Post created successfully'
      )
      form.reset()
      setFiles([]) // reset file input
    } catch {
      toast.error('Failed to create post')
    }
  }

  return (
    <Card className='mt-4 max-w-6xl'>
      <CardHeader>
        <CardTitle className='flex flex-row items-center gap-2'>
          <Pen />
          Create Post
        </CardTitle>
      </CardHeader>

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
                <p className='text-muted-foreground mb-2 text-sm'>
                  Add Images/Videos
                </p>
                <p className="text-xs text-muted-foreground mb-2">Maximum of 15 Images Only</p>
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

              <Button type='submit'>Post</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
