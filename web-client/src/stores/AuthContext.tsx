import React, { createContext, useReducer, FC, Dispatch, useEffect } from 'react'
import decode from 'jwt-decode'
import { authKeys } from '../constants'
import { setBearer } from '../api'
export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps)

export interface IClaims {
    is_admin: boolean
}
export interface IAuthContext {
    token?: string
    claims?: IClaims
}

export interface IAuthActions {
    payload?: any
    type: 'SET_TOKEN' | 'LOGOUT' | 'MORE_ACTIONS_HERE'
}
export const reducer = (state: IAuthContext, action: IAuthActions): IAuthContext => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload, claims: decode(action.payload) }
        case 'LOGOUT':
            localStorage.removeItem(authKeys.token)
            // @ts-ignore
            window.mgr.signoutRedirect()
            return {
                token: undefined,
                claims: undefined,
            }
        default:
            return state
    }
}

export interface IAuthContextProps {
    state: IAuthContext
    dispatch: Dispatch<IAuthActions>
}
export const AuthContextProvider: FC<any> = props => {
    const [state, dispatch] = useReducer(reducer, { token: undefined, claims: undefined }, init => init)

    // TODO: resolve the context initialization being after route
    const superEarlyInitToken = localStorage.getItem(authKeys.token)
    if (superEarlyInitToken) setBearer(superEarlyInitToken)

    useEffect(() => {
        const token = localStorage.getItem(authKeys.token)
        if (token) {
            dispatch({ type: 'SET_TOKEN', payload: token })
        }
    }, [])

    return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>
}

export default AuthContext
