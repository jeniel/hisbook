/* eslint-disable @typescript-eslint/no-explicit-any */
import { Main } from '@/components/layout/main'
import { Controller } from "react-hook-form";
import { useQuery, useMutation } from '@apollo/client'
import { ME_QUERY } from '@/graphql/operation/query/user'
import { UPDATE_PROFILE } from '@/graphql/operation/mutation/profile'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { toast } from 'sonner'

const ProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().optional(),
  gender: z.enum(["Male", "Female", "Others"]).optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
})

type ProfileFormData = z.infer<typeof ProfileSchema>

export default function Profile() {
  const { loading, error, data } = useQuery(ME_QUERY)
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE)

  const user = data?.meQuery?.user
  const profile = user?.profile

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: profile?.firstName || "",
      middleName: profile?.middleName || "",
      lastName: profile?.lastName || "",
      title: profile?.title || "",
      gender: profile?.gender || undefined,
      address: profile?.address || "",
      contact: profile?.contact || "",
    },
    values: {
      firstName: profile?.firstName || "",
      middleName: profile?.middleName || "",
      lastName: profile?.lastName || "",
      title: profile?.title || "",
      gender: profile?.gender || undefined,
      address: profile?.address || "",
      contact: profile?.contact || "",
    },
  })

  const onSubmit = async (values: ProfileFormData) => {
    try {
      await updateProfile({
        variables: {
          updateProfileId: profile.id,
          payload: values,
        },
        refetchQueries: [{ query: ME_QUERY }],
      });
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  

  if (loading) return <p>Loading profile...</p>
  if (error) return <p>Error loading profile: {error.message}</p>

  return (
    <Main>
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 space-x-4 mb-4">
          <div>
            <label className="block mb-1">First Name</label>
            <Input {...form.register("firstName")} />
          </div>

          <div>
            <label className="block mb-1">Middle Name</label>
            <Input {...form.register("middleName")} />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <Input {...form.register("lastName")} />
          </div>

          <div>
            <label className="block mb-1">Job Title</label>
            <Input {...form.register("title")} />
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            
            <Controller
              name="gender"
              control={form.control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <label className="block mb-1">Address</label>
            <Input {...form.register("address")} />
          </div>

          <div>
            <label className="block mb-1">Contact</label>
            <Input {...form.register("contact")} />
          </div>
        </div>

        <Button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Main>
  )
}
