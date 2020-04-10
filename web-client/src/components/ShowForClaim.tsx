import React, { FC, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext, { IClaims } from '../stores/AuthContext'

export interface IShowForClaimProps {
    children: React.ReactNode
    predicate: (claims: IClaims) => boolean
}

export const ShowForClaim: FC<IShowForClaimProps> = ({ children, predicate, ...rest }) => {
    const { state } = useContext(AuthContext)
    if (!state.claims) return <Redirect to="/login" />
    const match = predicate(state.claims)
    if (match) {
        return <Route {...rest} children={children} />
    } else {
        return null
    }
}

export default ShowForClaim
