import AppSidebar from "@/components/AppSidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <>
            <AppSidebar />
            <SidebarInset className="h-screen w-full">
                <Outlet />
            </SidebarInset>
        </>
    )
}

export default MainLayout