interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex h-[80vh] w-full max-w-7xl overflow-hidden rounded-lg border'>
        {/* Login */}
        <div className='flex flex-1 flex-col items-center justify-center p-8'>
          <div className='mb-4 text-center'>
            <img
              src='/images/acebook-logo.webp'
              alt='Acebook Logo'
              className='mx-auto'
              loading='lazy'
            />
          </div>
          <div className='w-full max-w-md space-y-4'>{children}</div>
        </div>

        {/* Image */}
        <div className='hidden flex-1 md:block'>
          <img
            src='/images/acebuilding.webp'
            alt='Building Image'
            className='h-full w-full object-cover'
            loading='lazy'
          />
        </div>
      </div>
    </div>
  )
}
