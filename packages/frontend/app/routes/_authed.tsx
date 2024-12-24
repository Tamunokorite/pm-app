import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Login } from '../components/Login'
import { useAppSession } from '../utils/session'
import { LoginData } from '../utils/types'
import { authService, orgService } from '../../lib/api'

export const loginFn = createServerFn()
  .validator((d: any) => d as LoginData)
  .handler(async ({ data }) => {

    const response = await authService.login(data)

    const session = await useAppSession()

    console.log({ response });
    
    // Create a session

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
    }

    return { ...response, redirectUrl: data.redirectUrl }
  })

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error('Not authenticated')
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === 'Not authenticated') {
      return <Login />
    }

    throw error
  },
})
