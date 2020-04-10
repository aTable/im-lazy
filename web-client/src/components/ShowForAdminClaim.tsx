import { FC } from 'react'
import ShowForClaim from './ShowForClaim'

export interface IShowForAdminOnly {
    children: React.ReactNode
}

export const ShowForAdminOnly: FC<IShowForAdminOnly> = ({ children, ...rest }) => {
    return ShowForClaim({
        children,
        predicate: token => token.is_admin === true,
        ...rest,
    })
}

export default ShowForAdminOnly
