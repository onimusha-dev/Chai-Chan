
import { useDataContext } from '@/context/DataContext';
import { SidebarFooter } from '../ui/sidebar'

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
        </SidebarFooter>
    )
}

export default AppSidebarFooter