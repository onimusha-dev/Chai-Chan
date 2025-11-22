import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layoutes/MainLayout'
import { SidebarProvider } from './components/ui/sidebar'
import { ThemeProvider } from './components/theme/theme-provider'
import { ResponseProvider } from './context/ResponsContext'
import ChatPage from './pages/ChatPage'
import { MemoryProvider } from './context/MemoryContext'
import SettingsPage from './pages/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/', element: <MainLayout />,
    children: [
      { index: true, element: <ChatPage /> },
      { path: 'Settings', element: <SettingsPage /> }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <SidebarProvider>
      <MemoryProvider>
        <ResponseProvider>
          <RouterProvider router={router} />
        </ResponseProvider>
      </MemoryProvider>
    </SidebarProvider>
  </ThemeProvider>
  // </StrictMode>, 
)
