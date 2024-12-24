import { useState } from 'react'
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { Plus } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@/app/hooks/useMutation'
import { createTaskFn } from '@/app/routes/_authed/dashboard'

interface TeamMember {
  userId: string
  firstName: string
  lastName: string
}

interface Project {
  id: string
  name: string
}

interface NewTaskModalProps {
  teamMembers: TeamMember[]
  projects: Project[]
  onAddTask: (task: { title: string; description: string; assigneeId: string }) => void
}

export function NewTaskModal({ teamMembers, onAddTask, projects }: NewTaskModalProps) {
  const router = useRouter()
    
  const [isOpen, setIsOpen] = useState(false)

  const createMutation = useMutation({
    fn: createTaskFn,
    onSuccess: async (ctx) => {
      await router.invalidate()
      setIsOpen(false)
      return
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task for your project. Fill in the details and assign it to a team member.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            const formData = new FormData(e.target as HTMLFormElement)
    
            createMutation.mutate({
              data: {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                userId: formData.get('user') as string,
                projectId: formData.get('project') as string
              }
            })
          }} 
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name='title'
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right">
                Project
              </Label>
              <Select name='project' required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a Project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id?.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee
              </Label>
              <Select name='user' required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.userId} value={member.userId?.toString()}>
                      {member.firstName} {member.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={createMutation.status === 'pending'}
            >
              {createMutation.status === 'pending' ? '...' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

