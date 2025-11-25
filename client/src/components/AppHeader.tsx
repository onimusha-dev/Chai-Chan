import { useUiContext } from '@/context/UiContext'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import IsTemporaryChat from '@/features/chatbox/IsTemporaryChat'
import { StartNewChatToggle } from '@/features/ChatView/StartNewChat'
import { Cat } from 'lucide-react'
// import { ModeToggle } from './theme/mode-toggle'

const AppHeader = () => {
  const { open } = useSidebar()

  const { model } = useUiContext()
  return (
    <header className="absolute top-0 left-0 px-2 py-4 flex w-full justify-between z-60 bg-background">

      {/* this is for bigger screens */}
      {
        !open &&
        <div className="absolute top-4 pl-5 md:p-2 md:ml-20 rounded-full md:border left-0 md:bg-accent h-10 w-full md:w-fit gap-2 md:gap-0 items-center md:justify-between flex "
        >
          <div className="absolute -left-14">
            <Cat size={38} className='text-blue-600' />
          </div>
          <SidebarTrigger />
          <StartNewChatToggle />
        </div>
      }

      <div className="flex w-full items-center justify-center">
        <p className="">{model}</p>
      </div>
      <IsTemporaryChat />
      {/* <ModeToggle /> */}
    </header>
  )
}

export default AppHeader