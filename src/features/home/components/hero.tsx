export default function Hero() {
  return (
    <section className='relative flex h-36 items-center justify-center overflow-hidden rounded-2xl shadow-lg sm:h-64 md:h-[28rem]'>
      <div className='absolute inset-0 bg-[url("./images/cover.png")] bg-cover bg-center bg-no-repeat scale-120 md:scale-100' />
    </section>
  )
}
