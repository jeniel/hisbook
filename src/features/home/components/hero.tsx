export default function Hero() {
  return (
    <section className='relative flex h-36 items-center justify-center overflow-hidden rounded-2xl shadow-lg sm:h-64 md:h-[28rem]'>
      <img
        src='/images/cover.png'
        alt='Cover'
        className='absolute inset-0 h-full w-full scale-120 object-cover md:scale-100'
      />
    </section>
  )
}
