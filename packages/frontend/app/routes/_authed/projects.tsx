import { createFileRoute } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import { DashboardSidebar } from '../../components/app/sidebar'
import { Projects } from "../../components/app/projects"
import { createServerFn } from '@tanstack/start'
import { orgService } from '../../../lib/api'
import { ProjectData } from '../../../app/utils/types'

export const fetchProjects = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const projects = await orgService.getProjects();

  return projects;
})

export const createProjectFn = createServerFn({ method: 'POST' })
  .validator((d: any) => d as ProjectData)
  .handler(async ({ data }) => {

    const response = await orgService.createProject(data)

    return response
  })

export const Route = createFileRoute('/_authed/projects')({
  component: RouteComponent,
  beforeLoad: async (ctx): Promise<typeof ctx & { projects: any }> => {
    const projects = await fetchProjects();

    return {
      ...ctx,
      projects
    }
  },
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Projects</h1>
            </div>
          </header>
          <main className="p-6">
            <Projects />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
