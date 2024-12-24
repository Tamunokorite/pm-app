import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardHeader, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Mail } from 'lucide-react'

interface TeamMemberProps {
  name: string
  role: string
  email: string
  avatarUrl: string
}

export function TeamMember({ name, role, email, avatarUrl }: TeamMemberProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={() => window.location.href = `mailto:${email}`}>
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Button>
      </CardContent>
    </Card>
  )
}

