import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/start'
import { useMutation } from '../hooks/useMutation'
import { loginFn } from '../routes/_authed'
import { Auth } from './Auth'
import { signupFn } from '../routes/signup'

export function Login() {
  const router = useRouter()

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate()
        router.navigate({ to: ctx.data.redirectUrl || '/dashboard' })
        return
      }
    },
  })

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  })

  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement)

        loginMutation.mutate({
          data: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          }
        })
      }}
    />
  )
}
