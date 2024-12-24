import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '../../components/ui/sidebar'
import { DashboardSidebar } from '../../components/app/sidebar'
import { Calendar } from '../../components/app/calendar'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_authed/calendar')({
  component: RouteComponent,
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
              <h1 className="text-2xl font-bold">Calendar</h1>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Event
            </Button>
          </header>
          <main className="p-6">
            <Calendar />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
