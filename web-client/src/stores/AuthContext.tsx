import React, { createContext, useReducer, Dispatch, useEffect, MutableRefObject, ReactNode } from 'react'
import { setBearer } from '../api/api'
import { User } from 'oidc-client'

export const authKeys = {
    user: 'auth-serialized-user',
}

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps)

export interface IClaims {
    is_admin: boolean
}
export interface IAuthContext {
    user?: User
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
            setBearer(action.payload.id_token)
            return {
                ...state,
                user: action.payload,
                token: action.payload.access_token,
                claims: undefined, //decode(action.payload),
            }
        case 'LOGOUT':
            localStorage.removeItem(authKeys.user)
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

export interface IAuthContextProviderProps {
    notificationSystem: MutableRefObject<null>
    children: ReactNode
}
export const AuthContextProvider = (props: IAuthContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, { token: undefined, claims: undefined }, (init) => init)

    // TODO: resolve the context initialization being after route
    const userSerialized = localStorage.getItem(authKeys.user)
    if (userSerialized) {
        const user: User = User.fromStorageString(userSerialized)
        setBearer(user.id_token)
    }

    useEffect(() => {
        const userSerialized = localStorage.getItem(authKeys.user)
        if (userSerialized) {
            const user: User = User.fromStorageString(userSerialized)
            dispatch({ type: 'SET_TOKEN', payload: user })
        }
    }, [])

    return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>
}

export default AuthContext
