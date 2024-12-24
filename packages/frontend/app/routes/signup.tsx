import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/start'
import { useMutation } from '../hooks/useMutation'
import { Auth } from '../components/Auth'
import { useAppSession } from '../utils/session'
import { RegisterData } from '../utils/types'
import { authService, orgService } from '../../lib/api'

export const signupFn = createServerFn()
  .validator(
    (d: any) =>
      d as RegisterData
  )
  .handler(async ({ data }) => {

    const response = await authService.register(data)
    // Create a session
    const session = await useAppSession()

    if (response) {
      await session.update({
        user: {
          ...session.data.user,
           user: response.user,
           token: response.token,
         }
       })

      const orgResponse = await orgService.getOrgs();
      if (orgResponse) {
        await session.update({
          user: {
             ...session.data.user,
             orgs: orgResponse
           }
         })
      }

      throw redirect({
        href: data.redirectUrl || '/',
      })
    }

    // Redirect to the prev page stored in the "redirect" search param
    throw redirect({
      href: data.redirectUrl || '/',
    })
  })

export const Route = createFileRoute('/signup')({
  component: SignupComp,
})

function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Auth
          actionText="Sign Up"
          status={signupMutation.status}
          onSubmit={(e) => {
            const formData = new FormData(e.target as HTMLFormElement)

            signupMutation.mutate({
              data: {
                firstName: formData.get('fname') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
              },
            })
          }}
          afterSubmit={
            signupMutation.data?.error ? (
              <>
                <div className="text-red-400">{signupMutation.data.message}</div>
              </>
            ) : null
          }
        />
      </div>
    </div>
  )
}
