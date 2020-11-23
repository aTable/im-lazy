import React, { createContext, useReducer, Dispatch, ReactNode } from 'react'
import { toast, ToastContent } from 'react-toastify'

export const UiContext = createContext<IUiContextProps>({} as IUiContextProps)

export interface IUiContext {}

export interface NotifyAction {
    type: 'NOTIFY'
    payload: ToastContent
}
export interface PurgeNotifications {
    type: 'PURGE_NOTIFICATIONS'
}

export type IUiActions = NotifyAction | PurgeNotifications

export const reducer = (state: IUiContext, action: IUiActions): IUiContext => {
    switch (action.type) {
        case 'PURGE_NOTIFICATIONS':
            return {
                ...state,
            }

        case 'NOTIFY':
            toast(action.payload)
            return state
        default:
            return state
    }
}

export interface IUiContextProps {
    state: IUiContext
    dispatch: Dispatch<IUiActions>
}

export interface IUiContextProviderProps {
    children: ReactNode
}

const initialValues: IUiContext = {}

const initializer = (init: IUiContext) => init

export const UiContextProvider = (props: IUiContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialValues, initializer)

    return <UiContext.Provider value={{ state, dispatch }}>{props.children}</UiContext.Provider>
}

export default UiContext
