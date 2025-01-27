import { redirectToProjectTasks, Route } from "@/app/routes/_authed/dashboard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { redirect, useNavigate, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { useServerFn } from "@tanstack/start"
import { useMutation } from "@/app/hooks/useMutation"

interface Project {
  id: string
  name: string
}

interface SelectProjectProps {
  projects: Project[]
}

export function SelectProject({ projects }: SelectProjectProps) {
  const { projectId } = Route.useSearch()
  const navigate = useNavigate();
  const router = useRouter()
  const redirectMutation = useMutation({
      fn: useServerFn(redirectToProjectTasks),
    })
  
  return (
    <Select
      value={projectId?.toString()} 
      onValueChange={async (value) => {
        // await router.invalidate({
        //   filter: ({ routeId }) => routeId === '/_authed/dashboard',
        // })
        // navigate({
        //   to: '/dashboard',
        //   search: {
        //     projectId: Number(value)
        //   },
        //   // reloadDocument: true
        // })
        redirectMutation.mutate({
          data: {
            projectId: Number(value)
          }
        })
      }}
      disabled={redirectMutation.status === "pending"}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id.toString()}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}