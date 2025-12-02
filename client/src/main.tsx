// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './components/theme/index.css';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layoutes/MainLayout';
import { SidebarProvider } from './components/ui/sidebar';
import { ThemeProvider } from './components/theme/theme-provider';
import { UiProvider } from './context/UiContext';
import ChatPage from './pages/ChatPage';
// import { MemoryProvider } from './context/MemoryContext';
import AuthLayout from './layoutes/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { DataProvider } from './context/DataContext';
import { UserProvier } from './context/UserContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <ChatPage /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to={'login'} replace /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <ThemeProvider>
        <SidebarProvider>
            <UserProvier>
            {/* <MemoryProvider> */}
                <DataProvider>
                <UiProvider>
                    <RouterProvider router={router} />
                </UiProvider>
                </DataProvider>
            {/* </MemoryProvider> */}
            </UserProvier>
        </SidebarProvider>
    </ThemeProvider>,
    // </StrictMode>,
);
