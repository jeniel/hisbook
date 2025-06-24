import React, { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { ThemeSwitch } from '@/components/theme-switch'

const FbPageId = () => {
  const { pageId } = useParams({ strict: false })
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log('Page ID:', pageId)

  const posts = [
    {
      id: 1,
      user: 'Metrobank Card',
      avatar: 'https://via.placeholder.com/50',
      title: 'Take your drives further with Toyota Mastercard®.',
      description: 'Fuel greater adventures ahead.',
      image: 'https://via.placeholder.com/300x150',
      sponsored: true,
    },
  ]

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
    </>
  )
}

export default FbPageId
