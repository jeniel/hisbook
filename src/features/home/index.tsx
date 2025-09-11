<<<<<<< Updated upstream
import CreatePost from './components/create-post'

// import Events from './components/events'
// import HomeFeed from './components/home-feed'
// import WeatherForecast from './components/weather'

export default function HomePage() {
  return (
    <div className='grid grid-cols-1 gap-4 pb-4 lg:grid-cols-4'>
      {/* Left Column */}
      <div className='order-2 space-y-4 lg:order-1 lg:col-span-3'>
        <CreatePost />
        {/* <HomeFeed /> */}
=======
import Events from '@/components/events'
import Features from './components/feature-cards'
import Hero from './components/hero'
import HomeTickets from './components/home-tickets'

export default function HomePage() {
  return (
    <div className='min-h-dvh rounded-2xl bg-green-50 dark:bg-zinc-900'>
      <div className='order-2 space-y-2 p-4 py-10 md:container md:py-16'>
        <Hero />
        <Features />
        <Events />
        <HomeTickets />
>>>>>>> Stashed changes
      </div>

      {/* Right Column */}
      {/* <div className='order-1 space-y-4 lg:order-2 lg:col-span-1'>
        <WeatherForecast />
        <Events />
      </div> */}
    </div>
  )
}
