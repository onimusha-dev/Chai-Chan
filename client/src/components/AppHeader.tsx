import { useUiContext } from '@/context/UiContext'
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import IsTemporaryChat from '@/features/chatbox/components/IsTemporaryChat'
import { StartNewChatToggle } from '@/features/ChatView/StartNewChat'
import { Cat } from 'lucide-react'
import { NavLink } from 'react-router-dom'
// import { ModeToggle } from './theme/mode-toggle'

const AppHeader = () => {
  const { open } = useSidebar()

  const { model } = useUiContext()
  return (
    <header className="absolute top-0 left-0 px-2 py-4 flex w-full justify-between z-40 bg-background">

      {/* this is for bigger screens */}
      {
        !open &&
        <div className="absolute top-4 pl-5 md:p-2 md:ml-20 rounded-full md:border left-0 md:bg-accent h-10 w-full md:w-fit gap-2 md:gap-0 items-center md:justify-between flex "
        >
          <NavLink to={'/'} draggable='false' className="absolute -left-14">
            <Cat size={38} className='text-blue-600' />
          </NavLink>
          <SidebarTrigger />
          <StartNewChatToggle />
        </div>
      }

      {/*  this is the top header text that view the session name */}
      <div className="w-full flex items-center justify-center">
        {/* <input
          type="text"
          // onChange={(e) => setModel(e.target.value)}
          value={model}
          className="flex justify-center px-3 py-2 rounded-full border border-transparent hover:border-accent hover:bg-accent/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 transition"
        /> */}
        <p className="hover:underline select-none">{model}</p>
      </div>
      <IsTemporaryChat />
    </header>
  )
}

export default AppHeader