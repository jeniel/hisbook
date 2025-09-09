import { z } from 'zod'

export const ProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Others']).optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
  employeeID: z.any().optional(),
})

export type ProfileFormData = z.infer<typeof ProfileSchema>
