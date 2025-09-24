import AuthLayout from '../auth-layout'
import SignUp from './components/sign-up'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <AuthLayout>
      <section className='gap-4 space-y-4 p-6'>
        <p className='text-lg font-semibold'>Sign In</p>
        <p>Enter your username and password below to log into your account</p>
        <UserAuthForm />

        {/* Divider text */}
        <div className='gap-2 space-y-2 text-sm'>
          <p>Don’t have an account?</p>
          <SignUp />
        </div>
      </section>
    </AuthLayout>
  )
}
