import React, { createContext, useReducer, FC, Dispatch } from 'react'

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps)

export interface IAuthContext {
    token?: string
}

export interface IAuthActions {
    payload?: any
    type: 'SET_TOKEN' | 'MORE_ACTIONS_HERE'
}
export const reducer = (state: IAuthContext, action: IAuthActions): IAuthContext => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload }
        default:
            return state
    }
}

export interface IAuthContextProps {
    state: IAuthContext
    dispatch: Dispatch<IAuthActions>
}
export const AuthContextProvider: FC<any> = props => {
    const [state, dispatch] = useReducer(reducer, {}, init => init)
    return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>
}

export default AuthContext
