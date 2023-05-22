import React, { useContext, ReactNode } from 'react'
import { Route, Navigate } from 'react-router-dom'
import AuthContext, { IClaims } from '../stores/AuthContext'

export interface IShowForClaimProps {
    children: ReactNode
    predicate: (claims: IClaims) => boolean
}

export const ShowForClaim = ({ children, predicate, ...rest }: IShowForClaimProps) => {
    const { state } = useContext(AuthContext)
    if (!state.claims) return <Navigate to="/login" />
    const match = predicate(state.claims)
    if (match) {
        return <Route {...rest}>{children}</Route>
    } else {
        return null
    }
}

export default ShowForClaim
