import { Link, redirect } from '@tanstack/react-router'
import { BarChart2, Kanban, Calendar, Settings, Users, HelpCircle, FolderKanban } from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar"
import { NavUser } from './nav-user'
import { Route } from '../../routes/_authed'

export function DashboardSidebar() {
  // if (!user) {
  //   throw redirect({
  //     to: "/login",
  //     search: {
  //       // Use the current location to power a redirect after login
  //       // (Do not use `router.state.resolvedLocation` as it can
  //       // potentially lag behind the actual current location)
  //       redirect: location.href,
  //     },
  //   });
  // }
  // const { data: orgs, isLoading } = useOrganizations(user.id);
  const { user } = Route.useRouteContext();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6" />
          <span className="text-lg font-bold">
            {/* {Boolean(orgs) && orgs[0].organizationName} */}
            {user?.orgs[0].organizationName}
            {import.meta.env.VITE_DB_URL}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <Kanban className="mr-2 h-4 w-4" />
                    <span>Kanban Board</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/projects">
                    <FolderKanban className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/team">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <p>{JSON.stringify(user)}</p> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser user={{
            name: `${user?.user?.first_name} ${user?.user?.last_name}`,
            email: user?.user?.email || '',
            avatar: user?.user?.profile_picture || ''
          }} 
        />
      </SidebarFooter>
    </Sidebar>
  )
}

