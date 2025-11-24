import { useResponseContext } from '@/context/ResponsContext';
import { SidebarFooter, SidebarGroupLabel } from '../ui/sidebar'

const AppSidebarFooter = () => {
    const { responses } = useResponseContext();
    const handleLoad = () => {

        console.log(responses)
    };
    return (
        <SidebarFooter>
            <button
                onClick={handleLoad}
            >
                load
            </button>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
        </SidebarFooter>
    )
}

export default AppSidebarFooter