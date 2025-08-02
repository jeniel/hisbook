import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { UPSERT_DOCUMENT } from '@/graphql/operation/mutation/content'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ModalProps {
  hide: () => void
  tenantId: string
  itemId: string
  content: string
  collectionName: string
}

const formSchema = z.object({
  content: z.string().min(1, 'Message is required'),
})

const UpsertContent = (props: ModalProps) => {
  const [upsertContent, { loading }] = useMutation(UPSERT_DOCUMENT)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: props.content || '' },
  })

  // const { tenantData } = useTenantById(props.tenantId as string)

 console.log('Submitting content:', props.tenantId)

  function onSubmit(values: z.infer<typeof formSchema>) {
    upsertContent({
      variables: {
        input: {
          collectionName: props.collectionName,
          documents: [
            {
              content: values.content,
              tenantId: props.tenantId,
              documentType: 'text',
              id: props.itemId || null,
            },
          ],
        },
      },
      onCompleted: () => {
        props.hide()
      },
    })
  }
  return (
    <Dialog open={true} onOpenChange={props.hide}>
      <DialogTrigger asChild>
        <Button variant='outline'>Open Content Form</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Enter your Content</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      wrap='soft'
                      className='h-48 resize-none'
                      placeholder='Type your Content here...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type='submit'>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpsertContent
