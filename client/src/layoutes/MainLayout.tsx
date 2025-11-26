import AppHeader from "@/components/AppHeader"
import AppSidebar from "@/components/app-sidebar/AppSidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
// import AudioPlayingpPopupNotifier from "@/features/ChatView/ResponseOptions/AudioPlayingpPopupNotifier"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <>
            <AppSidebar />
            <SidebarInset className="h-screen w-full">
                <Outlet />
                <AppHeader />
            </SidebarInset>
            <Toaster />
            {/* <AudioPlayingpPopupNotifier /> */}
        </>
    )
}

export default MainLayout