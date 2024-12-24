import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../components/Login'

export const Route = createFileRoute('/login')({
  component: LoginComp,
})

function LoginComp() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Login />
      </div>
    </div>
  )
}
