/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation, Query } from '@/graphql/codegen/graphql'
import { UPDATE_PROFILE } from '@/graphql/operation/mutation/profile'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery, useMutation } from '@apollo/client'
import { SquareCheckBig } from 'lucide-react'
import { toast } from 'sonner'
import { useUpload } from '@/hooks/useUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const { uploadFile, getFile } = useUpload()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const user = data?.meQuery?.user
  const profile = user?.profile

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      middleName: profile?.middleName || '',
      lastName: profile?.lastName || '',
      title: profile?.title || '',
      gender: (profile?.gender as 'Male' | 'Female' | 'Others') || undefined,
      address: profile?.address || '',
      contact: profile?.contact || '',
      employeeID: profile?.employeeID || '',
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
    }
  }

  // ✅ load avatar if exists
  useEffect(() => {
    if (profile?.avatar) {
      let active = true
      const fetchAvatar = async () => {
        const filename = profile.avatar ? profile.avatar.split('/').pop()! : ''
        const bucket = import.meta.env.VITE_MINIO_BUCKET
        const url = await getFile('avatar', filename, bucket)
        if (url && active) {
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev) // cleanup old blob URL
            return url
          })
        }
      }
      fetchAvatar()
      return () => {
        active = false
      }
    }
  }, [profile?.avatar])

  // ✅ useUpload hook
  const handleUpload = async (): Promise<string | null> => {
    if (!file) return null
    const result = await uploadFile(file, 'avatar')
    if (result.success && result.url) return result.url
    toast.error(result.message)
    return null
  }

  const onSubmit = async (values: ProfileFormData) => {
    try {
      if (!profile?.id) {
        toast.error('Profile information is missing.')
        return
      }

      // ✅ Transform all string fields to uppercase before submission
      const transformedValues: ProfileFormData = {
        ...values,
        firstName: values.firstName?.toUpperCase() || '',
        middleName: values.middleName?.toUpperCase() || '',
        lastName: values.lastName?.toUpperCase() || '',
        title: values.title?.toUpperCase() || '',
        gender: values.gender, // keep gender as is (since it's from a select)
        address: values.address?.toUpperCase() || '',
        contact: values.contact?.toUpperCase() || '',
        employeeID: values.employeeID?.toUpperCase() || '',
      }

      let avatarUrl = profile.avatar || null
      if (file) {
        avatarUrl = await handleUpload()
      }

      await updateProfile({
        variables: {
          updateProfileId: profile.id,
          payload: { ...transformedValues, avatar: avatarUrl },
        },
        refetchQueries: [{ query: ME_QUERY }],
      })
      toast.success('Profile updated successfully')
    } catch (_error) {
      toast.error('Failed to update Profile')
    }
  }

  if (loading) return <Spinner />
  if (error) return <p>Error loading profile: {error.message}</p>

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Profile Picture */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold'>Profile Picture</label>
              <Input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='max-w-80'
              />

              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt='Preview'
                  className='mb-2 h-32 w-32 border object-cover'
                  loading='lazy'
                />
              ) : preview ? (
                <img
                  src={preview}
                  alt='Profile'
                  className='mb-2 h-32 w-32 border object-cover'
                  loading='lazy'
                />
              ) : (
                <div className='mb-2 flex h-32 w-32 items-center justify-center border text-gray-400'>
                  No Avatar
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-1 block text-sm'>First Name</label>
                <Input
                  {...form.register('firstName')}
                  className='border border-black uppercase'
                />
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
              </div>

              <div>
                <label className='mb-1 block text-sm'>Contact</label>
                <Input
                  {...form.register('contact')}
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
