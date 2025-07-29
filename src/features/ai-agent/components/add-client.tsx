import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Dialog } from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { CREATE_TENANT } from '@/graphql/operation/mutation/tenant'
import { useMutation } from '@apollo/client'
import { Button } from '@/components/ui/button'
import {
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ModalProps {
  hide: () => void
  tenantId: string
  itemId: string
  collectionName: string
}

const formSchema = z.object({
  chatTableName: z.string().min(1, 'Chat table name is required'),
  collectionName: z.string().min(1, 'Collection name is required'),
  distance: z.enum(['Cosine', 'Euclidean', 'Manhattan'], {
    required_error: 'Distance metric is required',
  }),
  name: z.string().min(1, 'Name is required'),
  size: z.number().min(1, 'Size must be greater than 0'),
  slug: z.string().min(1, 'Slug is required'),
})

const AddCLient = (props: ModalProps) => {
  const [addTenant] = useMutation(CREATE_TENANT)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatTableName: '',
      collectionName: '',
      distance: 'Cosine',
      name: '',
      size: 1536,
      slug: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitting client details:', values)
    addTenant({
      variables: {
        createTenant: {
          ...values,
        },
      },
    })
      .then(() => {
        console.log('Client added successfully')
        props.hide()
      })
      .catch((error) => {
        console.error('Error adding client:', error)
      })
    //props.hide()
  }

  return (
    <div>
      <Dialog open={true} onOpenChange={props.hide}>
        <DialogTrigger asChild>
          <Button variant='outline'>Open Client Form</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter client name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter slug' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='chatTableName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chat Table Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter chat table name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='collectionName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter collection name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='distance'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance Metric</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select distance metric' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Cosine'>Cosine</SelectItem>
                          <SelectItem value='Euclidean'>Euclidean</SelectItem>
                          <SelectItem value='Manhattan'>Manhattan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='size'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter size'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type='submit'>Add Client</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddCLient
