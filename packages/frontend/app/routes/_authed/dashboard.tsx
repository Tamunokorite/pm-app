import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '../../components/ui/sidebar'
import { DashboardSidebar } from '../../components/app/sidebar'
import { KanbanBoard } from '../../components/app/kanban-board'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'
import { NewTaskModal } from '@/app/components/app/new-task-modal'
import { fetchTeam } from './team'
import { fetchProjects } from './projects'
import { createServerFn } from '@tanstack/start'
import { TaskData } from '../../../app/utils/types'
import { orgService } from '../../../lib/api'
import { useEffect, useState } from 'react'

export const createTaskFn = createServerFn({ method: 'POST' })
  .validator((d: any) => d as TaskData)
  .handler(async ({ data }) => {

    const response = await orgService.createTask(data)

    return response
  })

export const fetchTasks = createServerFn({ method: 'GET' }).handler(async () => {
    // We need to auth on the server so we have access to secure cookies
    const tasks = await orgService.getUserTasks();
  
    return tasks;
  })

export const Route = createFileRoute('/_authed/dashboard')({
  component: RouteComponent,
  beforeLoad: async (ctx): Promise<typeof ctx & { team: any, projects: any, tasks: any }> => {
      const [tasks, team, projects] = await Promise.all([
        await fetchTasks(),
        await fetchTeam(),
        await fetchProjects()
      ])
  
      return {
        ...ctx,
        team,
        projects,
        tasks
      }
  },
})

function RouteComponent() {
  const { team, projects } = Route.useRouteContext()
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
      setwinReady(true);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <NewTaskModal
              onAddTask={() => {}}
              teamMembers={team}
              projects={projects}
            />
          </header>
          <main className="p-6">
            {winReady ? <KanbanBoard /> : null}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
