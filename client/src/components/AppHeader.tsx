import { useUiContext } from '@/context/UiContext'
import { SidebarTrigger } from './ui/sidebar'
import IsTemporaryChat from '@/features/chatbox/IsTemporaryChat'
import { ModeToggle } from './theme/mode-toggle'

const AppHeader = () => {
  const { model } = useUiContext()
  return (
    <header className="absolute top-0 left-0 px-2 py-4 flex w-full justify-between z-60 bg-background">
      <div className="absolute left-0">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="">{model}</p>
      </div>
      <IsTemporaryChat />
      <ModeToggle />
    </header>
  )
}

export default AppHeader