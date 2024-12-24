import * as React from 'react'
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useMutation } from '../../hooks/useMutation'
import { inviteFn } from '../../routes/_authed/team'
import { useRouter } from '@tanstack/react-router'

interface AddTeamMemberFormProps {
  onSuccess: () => void
}

export function AddTeamMemberForm({ onSuccess }: AddTeamMemberFormProps) {
  const router = useRouter()

  const inviteMutation = useMutation({
      fn: inviteFn,
      onSuccess: async (ctx) => {
        await router.invalidate()
        onSuccess()
        return
      },
  })

  return (
    <form
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement)

        inviteMutation.mutate({
          data: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            first_name: formData.get('fname') as string,
            last_name: formData.get('lname') as string,
            role: formData.get('role') as string
          }
        })
      }} 
      className="space-y-4"
    >
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <Input
          id="fname"
          name="fname"
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <Input
          id="lname"
          name="lname"
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <Select name='role'>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={inviteMutation.status === 'pending'}
      >
        {inviteMutation.status === 'pending' ? '...' : 'Add Team Member'}
      </Button>
    </form>
  )
}
