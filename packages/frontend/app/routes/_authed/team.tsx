import { createFileRoute } from '@tanstack/react-router'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '../../components/ui/sidebar'
import { DashboardSidebar } from '../../components/app/sidebar'
import { Team } from '../../components/app/team'
import { orgService } from '../../../lib/api'
import { createServerFn } from '@tanstack/start'
import { AddTeamMemberModal } from '../../components/app/add-team-member-modal'
import { InviteData } from '../../utils/types'

export const fetchTeam = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const team = await orgService.getOrgMembers();

  return team;
})

export const inviteFn = createServerFn({ method: 'POST' })
  .validator((d: any) => d as InviteData)
  .handler(async ({ data }) => {

    const response = await orgService.inviteMember(data)

    return response
  })

export const Route = createFileRoute('/_authed/team')({
  component: RouteComponent,
  beforeLoad: async (ctx): Promise<typeof ctx & { team: any }> => {
    const team = await fetchTeam();

    return {
      ...ctx,
      team
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
              <h1 className="text-2xl font-bold">Team</h1>
            </div>
            <AddTeamMemberModal />
          </header>
          <main className="p-6">
            <Team />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

