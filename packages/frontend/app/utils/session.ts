// app/services/session.server.ts
import { useSession } from 'vinxi/http'

type SessionUser = {
  user: {
    user: any
    token: string
    orgs: any[]
  }
}

export function useAppSession() {
  return useSession<SessionUser>({
    password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
  })
}
