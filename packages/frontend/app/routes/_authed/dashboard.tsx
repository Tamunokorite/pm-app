import * as React from 'react'
import { createFileRoute, getRouteApi, redirect } from '@tanstack/react-router'

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
import { z } from 'zod'
import { SelectProject } from '@/app/components/app/select-project'

export const createTaskFn = createServerFn({ method: 'POST' })
  .validator((d: any) => d as TaskData)
  .handler(async ({ data }) => {

    const response = await orgService.createTask(data)

    return response
  })

export const fetchTasks = createServerFn({ method: 'GET' })
  .validator((d: any) => d as { projectId?: number })
  .handler(async ({ data }) => {
    // We need to auth on the server so we have access to secure cookies
    const tasks = data.projectId 
      ? await orgService.getProjectTasks(data.projectId) 
      : await orgService.getUserTasks();
  
    return tasks;
  })

export const redirectToProjectTasks = createServerFn()
  .validator((d: any) => d as { projectId?: number })
  .handler(async ({ data }) => {
    throw redirect({
      to: '/dashboard',
      search: {
        projectId: data.projectId
      },
      reloadDocument: true
    })
  })

const taskSearchSchema = z.object({
  projectId: z.number().optional()
})

type taskSearch = z.infer<typeof taskSearchSchema>

export const Route = createFileRoute('/_authed/dashboard')({
  component: RouteComponent,
  validateSearch: (search) => taskSearchSchema.parse(search),
  beforeLoad: async (ctx): Promise<typeof ctx & { team: any, projects: any }> => {

      const [team, projects] = await Promise.all([
        await fetchTeam(),
        await fetchProjects()
      ])
  
      return {
        ...ctx,
        team,
        projects,
      }
  },
  loaderDeps: ({ search: { projectId } }) => ({
    projectId,
  }),
  loader: async ({ deps: { projectId } }) => {
    const tasks = await fetchTasks({ data: { projectId } });
    return {
      tasks
    };
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
            <div className='w-[180px] mb-6'>
              <SelectProject projects={projects} />
            </div>
            {winReady ? <KanbanBoard /> : null}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
