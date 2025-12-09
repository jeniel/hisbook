import { SquareCheckBig } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ContactsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='col-span-1'>
            <Label
              htmlFor='primaryPhone'
              className='mb-2 block text-sm font-medium'
            >
              Primary Contact Number
            </Label>
            <Input
              id='primaryPhone'
              name='primaryPhone'
              type='text'
              placeholder='e.g. +63 912 345 6789'
            />
          </div>

          <div className='col-span-1'>
            <Label
              htmlFor='secondaryPhone'
              className='mb-2 block text-sm font-medium'
            >
              Secondary Contact Number
            </Label>
            <Input
              id='secondaryPhone'
              name='secondaryPhone'
              type='text'
              placeholder='Optional'
            />
          </div>

          <div className='col-span-1'>
            <Label htmlFor='email' className='mb-2 block text-sm font-medium'>
              Email
            </Label>
            <Input
              id='email'
              name='email'
              type='text'
              placeholder='you@example.com'
            />
          </div>

          <div className='col-span-1'>
            <Label htmlFor='hisd3Id' className='mb-2 block text-sm font-medium'>
              Hisd3 Id
            </Label>
            <Input
              id='hisd3Id'
              name='hisd3Id'
              type='text'
              placeholder='HISD3-XXXX'
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button type='submit' className='shadow-md'>
          <SquareCheckBig />
          Save Contact Information
        </Button>
      </CardFooter>
    </Card>
  )
}
