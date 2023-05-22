import { GraphQLClient } from 'graphql-request'
import Oidc from 'oidc-client'
import { QueryClient } from 'react-query'
import config from './config'

export const queryClient = new QueryClient()
export const graphClient = new GraphQLClient(config.graphqlRoute, { headers: {} })

export const mgr = new Oidc.UserManager(config.oidc)
// @ts-ignore
window.mgr = mgr
