import { createContext } from 'react'
import { MeQuery, User } from '../graphql/codegen/graphql'

export const NULLACCOUNT: MeQuery = {
  isSignedIn: false,
  user: {} as User,
}

export const AccountContext = createContext(NULLACCOUNT)

export const AccountProvider = AccountContext.Provider
export const AccountConsumer = AccountContext.Consumer
