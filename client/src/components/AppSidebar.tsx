import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Home, Folder, Settings } from "lucide-react";

export const projects = [
    {
        name: "Dashboard",
        url: "#",
        icon: Home
    },
    {
        name: "Projects",
        url: "#",
        icon: Folder
    },
    {
        name: "Settings",
        url: "#",
        icon: Settings
    }
];

const AppSidebar = () => {
  return (
      <Sidebar>
          <SidebarContent>
              <SidebarGroup>
                  <SidebarGroupLabel>Projects</SidebarGroupLabel>
                  <SidebarGroupContent>
                      <SidebarMenu>
                          {projects.map((project) => (
                              <SidebarMenuItem key={project.name}>
                                  <SidebarMenuButton asChild>
                                      <a href={project.url}>
                                          <project.icon />
                                          <span>{project.name}</span>
                                      </a>
                                  </SidebarMenuButton>
                              </SidebarMenuItem>
                          ))}
                      </SidebarMenu>
                  </SidebarGroupContent>
              </SidebarGroup>
          </SidebarContent>
      </Sidebar>
  )
}

export default AppSidebar