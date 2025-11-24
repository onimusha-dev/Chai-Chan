
import { useDataContext } from '@/context/DataContext';
import { SidebarFooter, SidebarGroupLabel } from '../ui/sidebar'

const AppSidebarFooter = () => {
    const { responses } = useDataContext();
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