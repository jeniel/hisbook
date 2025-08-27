import CreatePost from './components/create-post'
import Events from './components/events'
import HomeFeed from './components/home-feed'
import WeatherForecast from './components/weather'

export default function HomePage() {
  return (
    <div className='grid grid-cols-1 gap-4 pb-4 lg:grid-cols-4'>
      {/* Left Column */}
      <div className='order-2 space-y-4 lg:order-1 lg:col-span-3'>
        <CreatePost />
        <HomeFeed />
      </div>

      {/* Right Column */}
      <div className='order-1 space-y-4 lg:order-2 lg:col-span-1'>
        <WeatherForecast />
        <Events />
      </div>
    </div>
  )
}
