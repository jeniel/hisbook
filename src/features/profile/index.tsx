/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mutation, Query } from '@/graphql/codegen/graphql'
import { UPDATE_PROFILE } from '@/graphql/operation/mutation/profile'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { useQuery, useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { useUpload } from '@/hooks/useUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Main } from '@/components/layout/main'
import { ProfileFormData, ProfileSchema } from './components/types'

export default function Profile() {
  const { loading, error, data } = useQuery<Query>(ME_QUERY)
  const [updateProfile, { loading: updating }] =
    useMutation<Mutation>(UPDATE_PROFILE)

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
        const url = await getFile('acebook', 'avatar', filename)
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
      let avatarUrl = profile.avatar || null
      if (file) {
        avatarUrl = await handleUpload()
      }

      await updateProfile({
        variables: {
          updateProfileId: profile.id,
          payload: { ...values, avatar: avatarUrl },
        },
        refetchQueries: [{ query: ME_QUERY }],
      })
      toast.success('Profile updated successfully')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  if (loading) return <p>Loading profile...</p>
  if (error) return <p>Error loading profile: {error.message}</p>

  return (
    <Main>
      <h1 className='mb-4 text-2xl font-bold'>My Profile</h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-4xl space-y-6'
      >
        {/* Profile Picture */}
        <div className='space-y-2'>
          <label className='block font-medium'>
            Upload Your Profile Picture
          </label>
          <Input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='max-w-80'
          />

          {/* Show local preview if uploading new file, otherwise show fetched avatar */}
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt='Preview'
              className='mb-2 h-32 w-32 rounded-full border object-cover'
            />
          ) : preview ? (
            <img
              src={preview}
              alt='Profile'
              className='mb-2 h-32 w-32 rounded-full border object-cover'
            />
          ) : (
            <div className='mb-2 flex h-32 w-32 items-center justify-center rounded-full border text-gray-400'>
              No Avatar
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label className='mb-1 block'>First Name</label>
            <Input
              {...form.register('firstName')}
              className='border border-black'
            />
          </div>

          <div>
            <label className='mb-1 block'>Middle Name</label>
            <Input
              {...form.register('middleName')}
              className='border border-black'
            />
          </div>

          <div>
            <label className='mb-1 block'>Last Name</label>
            <Input
              {...form.register('lastName')}
              className='border border-black'
            />
          </div>

          <div>
            <label className='mb-1 block'>Job Title</label>
            <Input
              {...form.register('title')}
              className='border border-black'
            />
          </div>

          <div>
            <label className='mb-1 block'>Gender</label>
            <Controller
              name='gender'
              control={form.control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                >
                  <SelectTrigger className='border border-black'>
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
            <label className='mb-1 block'>Address</label>
            <Input
              {...form.register('address')}
              className='border border-black'
            />
          </div>

          <div>
            <label className='mb-1 block'>Contact</label>
            <Input
              {...form.register('contact')}
              className='border border-black'
            />
          </div>
        </div>

        <Button type='submit' disabled={updating}>
          {updating ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </Main>
  )
}
