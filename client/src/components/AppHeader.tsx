import { SidebarTrigger } from './ui/sidebar'

const AppHeader = () => {
  return (
      <header className="absolute top-0 left-0 px-2 py-4 flex w-full justify-between z-60 bg-background">
          <SidebarTrigger />
      </header>
  )
}

export default AppHeader