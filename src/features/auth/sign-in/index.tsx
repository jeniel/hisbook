// import {
//   Card,
//   CardContent,
//   CardDescription,
//   // CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  console.warn(import.meta.env.VITE_API_URL, '====> VITE API URL')
  return (
    <AuthLayout>
      <section className='gap-4 space-y-4 p-6'>
        <p className='text-lg font-semibold'>Sign In</p>
        <p>Enter your username and password below to log into your account</p>
        <UserAuthForm />
      </section>
    </AuthLayout>
  )
}
