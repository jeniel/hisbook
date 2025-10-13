import { Link } from '@tanstack/react-router'
import {
  CalendarCheck,
  FilePlus,
  MessageCircle,
  Star,
  User,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

export default function Features() {
  const features = [
    {
      icon: <CalendarCheck className='h-8 w-8 text-red-600' />,
      title: 'Attendance',
      url: '/attendance',
      description:
        'Check and track your daily attendance records in real time.',
    },
    {
      icon: <MessageCircle className='h-8 w-8 text-purple-600' />,
      title: 'Chat',
      url: '/chat',
      description: 'Chat with our AI Assistan named "ACE-istant" ',
    },
    {
      icon: <FilePlus className='h-8 w-8 text-green-600' />,
      title: 'Tickets',
      url: '/user-tickets',
      description:
        'Create tickets or request IT, Engineering, or Maintenance services.',
    },
    {
      icon: <User className='h-8 w-8 text-blue-600' />,
      title: 'Profile',
      url: '/profile',
      description:
        'Easily update your personal information and keep it up to date.',
    },
  ]

  return (
    <section className='py-4'>
      <p className='mb-4 flex items-center gap-2 text-xl md:text-2xl'>
        <Star className='text-yellow-500' />
        Features
      </p>
      <div className='grid gap-6 md:grid-cols-3'>
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.url}
            className='block hover:no-underline'
          >
            <Card className='h-full cursor-pointer rounded-2xl border shadow-lg transition hover:scale-105 hover:border-blue-500 hover:shadow-xl'>
              <CardHeader className='flex flex-col items-center text-center'>
                <div className='mb-4'>{feature.icon}</div>
                <CardTitle className='text-xl'>{feature.title}</CardTitle>
                <CardDescription className='mt-2 text-gray-500'>
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
