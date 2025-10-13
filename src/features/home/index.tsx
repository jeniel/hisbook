import Events from './components/events'
import Features from './components/feature-cards'
import Hero from './components/hero'

export default function HomePage() {
  return (
    <div className='min-h-dvh rounded-2xl bg-green-50 dark:bg-zinc-900'>
      <div className='order-2 space-y-2 p-4 py-10 md:container md:py-16'>
        <Hero />
        <Features />
        <Events />
      </div>
    </div>
  )
}
