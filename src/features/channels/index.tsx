import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { IconBrandFacebook, IconThumbUp, IconUser } from '@tabler/icons-react'
import { Query } from '@/graphql/codegen/graphql'
import { GET_FACEBOOK_DETALS } from '@/graphql/operation/query/socials'
import { useQuery } from '@apollo/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'

const appText = new Map<string, string>([
  // ['all', 'All Apps'],
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['twitter', 'Twitter'],
])

interface Channel {
  name: string
  id: string
}

const channels: Channel[] = [
  {
    name: 'Facebook',
    id: 'facebook',
  },
  {
    name: 'Instagram',
    id: 'instagram',
  },
  {
    name: 'Twitter',
    id: 'twitter',
  },
]

const ChannelsPage = () => {
  const [appType, setAppType] = useState<any>(channels[0].name) // Default to Facebook
  // const [searchTerm, setSearchTerm] = useState('')
  const { data, loading } = useQuery<Query>(GET_FACEBOOK_DETALS)
  const facebookDetails = data?.findAllFbDetails.data || []

  const navigate = useNavigate()

  return (
    <>
      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Chanel Integrations
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of our channels!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Search...'
              className='h-9 w-40 lg:w-[250px]'
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger className='w-50'>
                <SelectValue>{appType}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {channels.map((channel) => (
                  <SelectItem key={channel.id} value={channel.name}>
                    {appText.get(channel.id) || channel.name}
                  </SelectItem>
                ))}
                {/* <SelectItem value='all'>All Apps</SelectItem> */}
                {/* <SelectItem value='connected'>Connected</SelectItem>
                <SelectItem value='notConnected'>Not Connected</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className='shadow-sm' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {facebookDetails.map((item) => (
            <li key={item.id} className='rounded-lg border p-4 hover:shadow-md'>
              <div className='mb-8 flex items-center justify-between'>
                <img
                  src={item.imageUrl ?? ''}
                  alt={item.name ?? ''}
                  className={`bg-muted flex size-10 items-center justify-center rounded-lg p-2`}
                />
                {/* {item.imageUrl} */}

                <div className='flex items-center space-x-2'>
                  <Button
                    onClick={() =>
                      navigate({
                        to: `/channels/$pageId`,
                        params: { pageId: item.id },
                      })
                    }
                    variant='outline'
                    size='sm'
                  >
                    View
                  </Button>
                </div>
              </div>
              <div>
                <h2 className='mb-1 font-semibold'>{item.name}</h2>
              </div>
              <div className='text-muted-foreground text-sm'>
                <IconThumbUp className='inline h-4 w-4' /> {item.fanCount} |
                <IconUser className='inline h-4 w-4' /> {item.followersCount} |
                <IconBrandFacebook
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link, '_blank')
                    }
                  }}
                  className='inline h-4 w-4 cursor-pointer'
                />
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}

export default ChannelsPage
