import { z } from 'zod'

export const ProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Others']).optional(),
  address: z.string().min(1, 'Address is required'),
  contact: z.string().min(1, 'Contact Number is required'),
  secondaryContact: z.string().optional(),
  email: z.string().optional(),
  employeeID: z.any().optional(),
})

export type ProfileFormData = z.infer<typeof ProfileSchema>
