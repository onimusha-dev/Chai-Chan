import { useResponseContext } from '@/context/ResponsContext'
import { SidebarTrigger } from './ui/sidebar'
import IsTemporaryChat from '@/features/chatbox/IsTemporaryChat'

const AppHeader = () => {
  const { model } = useResponseContext()
  return (
    <header className="absolute top-0 left-0 px-2 py-4 flex w-full justify-between z-60 bg-background">
      <div className="absolute left-0">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="">{model}</p>
      </div>
      <IsTemporaryChat />
    </header>
  )
}

export default AppHeader