import { createFileRoute } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../../components/ui/sidebar"
import { DashboardSidebar } from "../../components/app/sidebar"
import { ProjectDetails } from "../../components/app/project-details"
import { Button } from "../../components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/projects/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <Link href="/projects">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Project Details</h1>
            </div>
          </header>
          <main className="p-6">
            <ProjectDetails />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
