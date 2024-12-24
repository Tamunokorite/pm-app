import { useState } from 'react'
import { PlusCircle, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Link, useRouter } from '@tanstack/react-router'
import { createProjectFn, Route } from '../../../app/routes/_authed/projects'
import { useMutation } from '../../../app/hooks/useMutation'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
}

export function Projects() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { projects } = Route.useRouteContext()

  const router = useRouter()
  
    const createMutation = useMutation({
        fn: createProjectFn,
        onSuccess: async (ctx) => {
          await router.invalidate()
          setIsDialogOpen(false)
          return
        },
    })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                const formData = new FormData(e.target as HTMLFormElement)
        
                createMutation.mutate({
                  data: {
                    name: formData.get('name') as string,
                    description: formData.get('description') as string,
                  }
                })
              }} 
            >
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      className="col-span-3"
                    />
                  </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={createMutation.status === 'pending'}
                >
                  {createMutation.status === 'pending' ? '...' : 'Save Project'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {project.name}
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            {/* <CardContent>
              <p>Status: {project.status}</p>
            </CardContent> */}
            {/* <CardFooter>
              <Link href={`/projects/${project.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  )
}

