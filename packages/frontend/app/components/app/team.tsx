import { TeamMember } from "./team-member"
import LoadingSpinner from "./loading-spinner";
import { redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { Route } from "../../../app/routes/_authed/team";

export function Team() {
  const { team } = Route.useRouteContext()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team?.map((member: any) => (
          <TeamMember
            key={member.email} 
            name={`${member.firstName} ${member.lastName}`}
            email={member.email}
            role={member.role}
            avatarUrl=""
          />
        ))}
    </div>
  )
}
