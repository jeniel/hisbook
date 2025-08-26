import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const forecast = [
  {
    day: 'Monday',
    date: 'Aug 26, 2025',
    condition: 'Sunny',
    temperature: '32°C',
  },
  {
    day: 'Tuesday',
    date: 'Aug 27, 2025',
    condition: 'Cloudy',
    temperature: '28°C',
  },
  {
    day: 'Wednesday',
    date: 'Aug 28, 2025',
    condition: 'Rainy',
    temperature: '25°C',
  },
  {
    day: 'Thursday',
    date: 'Aug 29, 2025',
    condition: 'Thunderstorm',
    temperature: '26°C',
  },
  {
    day: 'Friday',
    date: 'Aug 30, 2025',
    condition: 'Partly Cloudy',
    temperature: '30°C',
  },
]

export default function WeatherForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {forecast.map((day, index) => (
          <div
            key={index}
            className='flex justify-between border-b pb-2 last:border-none'
          >
            <div>
              <p className='font-medium'>{day.day}</p>
              <p className='text-muted-foreground text-sm'>{day.date}</p>
              <p className='text-muted-foreground text-sm'>{day.condition}</p>
            </div>
            <p className='font-semibold'>{day.temperature}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
