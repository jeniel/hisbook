/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation } from '@/graphql/codegen/graphql'
import { CREATE_POST } from '@/graphql/operation/mutation/post'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useMutation, useQuery } from '@apollo/client'
import { Pen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

// Validation schema
const FormSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
})

export default function CreatePost() {
  const [createPost] = useMutation<Mutation>(CREATE_POST)
  const { data: meData } = useQuery(ME_QUERY)

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
      const res = await createPost({
        variables: {
          payload: {
            content: data.content,
            userId,
          },
        },
      })

      toast.success(
        res.data?.createPost?.message ?? 'Post created successfully'
      )
      form.reset()
    } catch (error) {
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

      <CardContent className='space-y-4'>
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

            <Button type='submit'>Post</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
