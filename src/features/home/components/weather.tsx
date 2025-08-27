/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

const weatherMap: Record<number, string> = {
  0: 'Clear ☀️',
  1: 'Mostly Clear 🌤️',
  2: 'Partly Cloudy ⛅',
  3: 'Cloudy ☁️',
  45: 'Fog 🌫️',
  48: 'Rime Fog 🌫️',
  51: 'Light Drizzle 🌦️',
  61: 'Rain 🌧️',
  80: 'Showers 🌧️',
  95: 'Thunderstorm ⛈️',
}

export default function WeatherForecast() {
  const [forecast, setForecast] = useState<any[]>([])

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=9.625&longitude=123.875&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia/Singapore`
      )
      const data = await res.json()

      // Map API response into your card format
      const mapped = data.daily.time
        .slice(0, 5)
        .map((date: string, i: number) => {
          const dayName = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
          })
          
          // Format Date
          const dateFormatted = new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })

          // Format Average Temp
          const avgTemp =
            (data.daily.temperature_2m_max[i] +
              data.daily.temperature_2m_min[i]) /
            2

          return {
            day: dayName,
            date: dateFormatted,
            condition: weatherMap[data.daily.weather_code[i]] || 'Unknown',
            temperature: `${avgTemp.toFixed(1)}°C`,
          }
        })

      setForecast(mapped)
    }

    fetchWeather()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          ☀️ Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-row gap-3 overflow-x-auto lg:flex-col lg:overflow-visible'>
        {forecast.length === 0 ? (
          <p className='text-muted-foreground text-sm'>Loading forecast...</p>
        ) : (
          forecast.map((day, index) => (
            <div
              key={index}
              className='flex min-w-[160px] flex-col items-center justify-between border-b pb-2 last:border-none lg:min-w-0 lg:flex-row'
            >
              <div className='text-center lg:text-left'>
                <p className='font-medium'>{day.day}</p>
                <p className='text-muted-foreground text-sm'>{day.date}</p>
                <p className='text-muted-foreground text-sm'>{day.condition}</p>
              </div>
              <p className='mt-2 font-semibold lg:mt-0'>{day.temperature}</p>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <p className='text-muted-foreground text-xs italic'>
          Powered by Open-Meteo
        </p>
      </CardFooter>
    </Card>
  )
}
