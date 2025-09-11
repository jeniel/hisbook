export default function Hero() {
  return (
    <section className='relative rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-500 px-4 py-10 text-center text-white shadow-lg transition hover:shadow-xl md:py-20'>
      <div>
        <div className='mx-auto max-w-4xl flex-row justify-center'>
          {/* Heading */}
          <h1 className='mb-4 text-3xl font-extrabold md:text-6xl'>
            <p>
              Welcome to <span className='text-green-500'>ACE-</span>
              <span className='text-red-500'>Book</span>
            </p>
          </h1>

          {/* Subtext */}
          <p className='text-md text-blue-50 md:text-xl'>
            Check your Attendance or Request a Service
          </p>
        </div>
      </div>
    </section>
  )
}
