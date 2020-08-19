import { ReactNode } from 'react'
import ShowForClaim from './ShowForClaim'

export interface IShowForAdminOnly {
    children: ReactNode
}

export const ShowForAdminOnly = ({ children, ...rest }: IShowForAdminOnly) => {
    return ShowForClaim({
        children,
        predicate: (token) => token.is_admin === true,
        ...rest,
    })
}

export default ShowForAdminOnly
