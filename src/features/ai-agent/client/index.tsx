import React from 'react'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'

const ClientPage = () => {
    const clientList = [
        {
            name: 'Slack',
            desc: 'Connect your Slack account to receive notifications and interact with the AI agent.',
            logo: <img src='/logos/slack.svg' alt='Slack Logo' className='h-6 w-6' />,
            connected: true,
        },
        {
            name: 'Discord',
            desc: 'Integrate with Discord to manage your server and automate tasks.',
            logo: <img src='/logos/discord.svg' alt='Discord Logo' className='h-6 w-6' />,
            connected: false,
        },
        {
            name: 'GitHub',
            desc: 'Connect to GitHub for code management and collaboration.',
            logo: <img src='/logos/github.svg' alt='GitHub Logo' className='h-6 w-6' />,
            connected: true,
        },
        {
            name: 'Trello',
            desc: 'Use Trello for task management and project organization.',
            logo: <img src='/logos/trello.svg' alt='Trello Logo' className='h-6 w-6' />,
            connected: false,
        },
    ]
    
    return (
    <>
      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            A.I Agent Client Integrations
          </h1>
          <p className='text-muted-foreground'>Client List</p>
        </div>
        <Separator className='shadow-sm' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {clientList.map((app) => (
            <li
              key={app.name}
              className='rounded-lg border p-4 hover:shadow-md'
            >
              <div className='mb-8 flex items-center justify-between'>
                <div
                  className={`bg-muted flex size-10 items-center justify-center rounded-lg p-2`}
                >
                  {app.logo}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className={`${app.connected ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                >
                  {app.connected ? 'Connected' : 'Connect'}
                </Button>
              </div>
              <div>
                <h2 className='mb-1 font-semibold'>{app.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{app.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}

export default ClientPage
