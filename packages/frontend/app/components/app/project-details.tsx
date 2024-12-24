import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'completed'
  assignee: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

interface Project {
  id: string
  name: string
  description: string
  progress: number
  tasks: Task[]
  team: TeamMember[]
}

const projectData: Project = {
  id: '1',
  name: 'Website Redesign',
  description: 'Overhaul of company website to improve user experience and conversion rates.',
  progress: 65,
  tasks: [
    { id: '1', title: 'Design new homepage', status: 'completed', assignee: 'Alice Johnson' },
    { id: '2', title: 'Implement responsive layout', status: 'in-progress', assignee: 'Bob Smith' },
    { id: '3', title: 'Optimize images and assets', status: 'todo', assignee: 'Carol Williams' },
    { id: '4', title: 'Write new content', status: 'in-progress', assignee: 'David Brown' },
    { id: '5', title: 'SEO optimization', status: 'todo', assignee: 'Eva Martinez' },
  ],
  team: [
    { id: '1', name: 'Alice Johnson', role: 'Project Manager', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '2', name: 'Bob Smith', role: 'Senior Developer', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '3', name: 'Carol Williams', role: 'UX Designer', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '4', name: 'David Brown', role: 'Content Writer', avatar: '/placeholder.svg?height=32&width=32' },
    { id: '5', name: 'Eva Martinez', role: 'SEO Specialist', avatar: '/placeholder.svg?height=32&width=32' },
  ],
}

export function ProjectDetails() {
  const [project, setProject] = useState<Project>(projectData)

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'todo':
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm font-medium">Progress</p>
              <Progress value={project.progress} className="mt-2" />
            </div>
            <div className="text-2xl font-bold">{project.progress}%</div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Manage and track project tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {project.tasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      <span>{task.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{task.assignee}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full">
                <Plus className="mr-2 h-4 w-4" /> Add New Task
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Project team and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {project.team.map((member) => (
                  <li key={member.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

