import { Sidebar, } from '../ui/sidebar';
import AppSidebarFooter from './AppSidebarFooter';
import AppSidebarBody from './AppSidebarBody';
import AppSidebarHeader from './AppSidebarHeader';

const AppSidebar = () => {
    return (
        <Sidebar className='select-none'>
            <AppSidebarHeader />
            <AppSidebarBody />
            <AppSidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;
