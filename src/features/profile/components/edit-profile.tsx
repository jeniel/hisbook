import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation, Query } from '@/graphql/codegen/graphql'
import { UPDATE_PROFILE } from '@/graphql/operation/mutation/profile'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery, useMutation } from '@apollo/client'
import { SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Spinner from '@/components/spinner'
import { ProfileFormData, ProfileSchema } from './types'

export default function EditProfile() {
  const { loading, error, data } = useQuery<Query>(ME_QUERY)
  const [updateProfile] = useMutation<Mutation>(UPDATE_PROFILE)

  const user = data?.meQuery?.user
  const profile = user?.profile

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      middleName: profile?.middleName || '',
      lastName: profile?.lastName || '',
      title: profile?.title || '',
      gender: profile?.gender as 'Male' | 'Female' | 'Others' | undefined,
      address: profile?.address || '',
      contact: profile?.contact || '',
      secondaryContact: profile?.secondaryContact || '',
      email: profile?.email || '',
      employeeID: profile?.employeeID || '',
    },
  })

  const onSubmit = async (values: ProfileFormData) => {
    if (!profile?.id) {
      toast.error('Profile information is missing.')
      return
    }

    const transformedValues: ProfileFormData = {
      ...values,
      firstName: values.firstName.toUpperCase(),
      middleName: values.middleName?.toUpperCase() || '',
      lastName: values.lastName.toUpperCase(),
      title: values.title?.toUpperCase() || '',
      address: values.address.toUpperCase(),
      contact: values.contact.toUpperCase(),
      secondaryContact: values.secondaryContact?.toUpperCase() || '',
      email: values.email?.toUpperCase(),
      employeeID: values.employeeID.toUpperCase(),
      gender: values.gender,
    }

    try {
      await updateProfile({
        variables: {
          updateProfileId: profile.id,
          payload: transformedValues,
        },
        refetchQueries: [{ query: ME_QUERY }],
      })
      toast.success('Profile updated successfully')
    } catch {
      toast.error('Failed to update profile')
    }
  }

  if (loading) return <Spinner />
  if (error) return <p>Error loading profile: {error.message}</p>

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Form Fields */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-1 block text-sm'>First Name</label>
                <Input
                  {...form.register('firstName')}
                  className='border border-black uppercase'
                />
                {form.formState.errors.firstName && (
                  <p className='text-sm text-red-600'>
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-1 block text-sm'>Middle Name</label>
                <Input
                  {...form.register('middleName')}
                  className='border border-black uppercase'
                />
              </div>

              <div>
                <label className='mb-1 block text-sm'>Last Name</label>
                <Input
                  {...form.register('lastName')}
                  className='border border-black uppercase'
                />
                {form.formState.errors.lastName && (
                  <p className='text-sm text-red-600'>
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-1 block text-sm'>Job Title</label>
                <Input
                  {...form.register('title')}
                  className='border border-black uppercase'
                />
              </div>

              <div>
                <label className='mb-1 block text-sm'>Gender</label>
                <Controller
                  name='gender'
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <SelectTrigger className='border border-black uppercase'>
                        <SelectValue placeholder='Select gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Male'>Male</SelectItem>
                        <SelectItem value='Female'>Female</SelectItem>
                        <SelectItem value='Others'>Others</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm'>Address</label>
                <Input
                  {...form.register('address')}
                  className='border border-black uppercase'
                />
                {form.formState.errors.address && (
                  <p className='text-sm text-red-600'>
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-1 block text-sm'>
                  Primary Contact Number
                </label>
                <Input
                  {...form.register('contact')}
                  className='border border-black uppercase'
                />
                {form.formState.errors.contact && (
                  <p className='text-sm text-red-600'>
                    {form.formState.errors.contact.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-1 block text-sm'>
                  Secondary Contact Number
                </label>
                <Input
                  {...form.register('secondaryContact')}
                  className='border border-black uppercase'
                />
              </div>

              <div>
                <label className='mb-1 block text-sm'>Email</label>
                <Input
                  {...form.register('email')}
                  className='border border-black uppercase'
                />
              </div>

              <div>
                <label className='mb-1 block text-sm'>Employee ID</label>
                <Input
                  {...form.register('employeeID')}
                  className='border border-black uppercase'
                  inputMode='numeric'
                  pattern='[0-9]*'
                />
              </div>
            </div>

            <Button type='submit' className='shadow-md'>
              <SquareCheckBig />
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
