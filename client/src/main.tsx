import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layoutes/MainLayout'
import { SidebarProvider } from './components/ui/sidebar'
import { ThemeProvider } from './components/theme/theme-provider'
import { ResponseProvider } from './context/ResponsContext'
import ChatPage from './pages/ChatPage'

const router = createBrowserRouter([
  {
    path: '/', element: <MainLayout />,
    children: [
      {
        index: true, element: <ChatPage />
      },
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <SidebarProvider>
      <ResponseProvider>
        <RouterProvider router={router} />
      </ResponseProvider>
    </SidebarProvider>
  </ThemeProvider>
  // </StrictMode>, 
)
