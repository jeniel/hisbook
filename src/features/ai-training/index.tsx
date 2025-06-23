import { Header } from '@/components/layout/header'
import { ThemeSwitch } from '@/components/theme-switch'

const AiTrainingPage = () => {
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

export default AiTrainingPage
