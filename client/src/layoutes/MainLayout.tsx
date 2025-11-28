import AppHeader from "@/components/AppHeader"
import AppSidebar from "@/components/app-sidebar/AppSidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { useUserContext } from "@/context/AuthContext"
// import AudioPlayingpPopupNotifier from "@/features/ChatView/ResponseOptions/AudioPlayingpPopupNotifier"
import { Navigate, Outlet } from "react-router-dom"

const MainLayout = () => {
    const { userData, isLoading } = useUserContext()
    if(isLoading) {
        return(
            <div className="w-screen h-screen flex items-center justify-center">
                loading...
            </div>
        )
    }

    if(userData === null || userData?.auth === false) {
        // const navigator = useNavigate()
        return <Navigate to={'/auth'} replace/>
    }

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