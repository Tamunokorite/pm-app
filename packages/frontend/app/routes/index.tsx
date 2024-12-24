import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BarChart2, CheckCircle, Users, Calendar, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { user } = Route.useRouteContext()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">WorkWise</span>
          <BarChart2 className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">WorkWise</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {
            Boolean(user) ? (
              <>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
                  Dashboard
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/logout">
                  Logout
                </Link>
              </>
            ) : (
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
                Get Started
              </Link>
            )
          }
          {/* <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link> */}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Projects with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  WorkWise helps teams collaborate, track progress, and deliver projects on time. Boost your productivity today.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CheckCircle className="w-8 h-8 mb-2 text-green-500" />
                  <CardTitle>Task Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Create, assign, and track tasks with ease. Keep your team aligned and projects on schedule.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 mb-2 text-blue-500" />
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Foster teamwork with real-time communication, file sharing, and collaborative workspaces.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="w-8 h-8 mb-2 text-purple-500" />
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Visualize project progress, set milestones, and ensure deadlines are met with interactive timelines.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Industry Leaders</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See why top companies choose WorkWise for their project management needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Streamlined Our Workflow</CardTitle>
                  <CardDescription>TechCorp Inc.</CardDescription>
                </CardHeader>
                <CardContent>
                  "WorkWise has revolutionized how we manage projects. It's intuitive, powerful, and has significantly improved our team's productivity."
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Streamlined Our Workflow</CardTitle>
                  <CardDescription>TechCorp Inc.</CardDescription>
                </CardHeader>
                <CardContent>
                  "WorkWise has revolutionized how we manage projects. It's intuitive, powerful, and has significantly improved our team's productivity."
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of teams already using WorkWise to boost their productivity.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 WorkWise. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
