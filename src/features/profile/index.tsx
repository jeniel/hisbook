import Events from '../home/components/events'
import WeatherForecast from '../home/components/weather'
import EditProfile from './components/edit-profile'

export default function Profile() {
  return (
    <>
      <div className='grid grid-cols-1 gap-4 pb-4 md:grid-cols-4'>
        
        {/* Left Column */}
        <div className='order-2 space-y-4 md:order-1 md:col-span-3'>
          <EditProfile />
        </div>

        {/* Right Column */}
        <div className='order-1 space-y-4 md:order-2 md:col-span-1'>
          <WeatherForecast />
          <Events />
        </div>
      </div>
    </>
  )
}
