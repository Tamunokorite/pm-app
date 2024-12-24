import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { BarChart2 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  status: 'pending' | 'idle' | 'success' | 'error'
  afterSubmit?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <BarChart2 className="h-6 w-6" />
              </div>
              <span className="sr-only">WorkWise</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to WorkWise</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            { 
              actionText === 'Sign Up' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="email">First Name</Label>
                    <Input
                      id="fname"
                      name="fname"
                      type="text"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Last Name</Label>
                    <Input
                      id="lname"
                      name="lname"
                      type="text"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </>
              )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        </div>
          <Button
            type="submit"
            className="w-full rounded py-2 font-black uppercase"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? '...' : actionText}
          </Button>
          {afterSubmit ? afterSubmit : null}
        </form>
    </div>
  )
}
