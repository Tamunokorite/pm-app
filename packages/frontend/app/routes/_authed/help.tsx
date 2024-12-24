import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '../../components/ui/sidebar'
import { DashboardSidebar } from '../../components/app/sidebar'
import { Help } from '../../components/app/help'

export const Route = createFileRoute('/_authed/help')({
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
              <h1 className="text-2xl font-bold">Help Center</h1>
            </div>
          </header>
          <main className="p-6">
            <Help />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
