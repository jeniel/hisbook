import Features from './components/feature-cards'
import Hero from './components/hero'
import HomeTickets from './components/home-tickets'

export default function HomePage() {
  return (
    <div className='rounded-2xl bg-green-50 dark:bg-zinc-900 min-h-dvh'>
      <div className='order-2 p-4 md:container space-y-2 py-10 md:py-16'>
        <Hero />
        <Features />
        <HomeTickets />
      </div>
    </div>
  )
}
