import React, { createContext, useReducer, Dispatch, useEffect, ReactNode, RefObject } from 'react'
import { System, Notification } from 'react-notification-system'

export const UiContext = createContext<IUiContextProps>({} as IUiContextProps)

export interface IUiContext {
    notificationSystem?: RefObject<System>
}

export interface NotifyAction {
    type: 'NOTIFY'
    payload: Notification
}
export interface PurgeNotifications {
    type: 'PURGE_NOTIFICATIONS'
}
export interface SetNotificationSystem {
    type: 'SET_NOTIFICATION_SYSTEM'
    payload: RefObject<System>
}

export type IUiActions = NotifyAction | PurgeNotifications | SetNotificationSystem

export const reducer = (state: IUiContext, action: IUiActions): IUiContext => {
    switch (action.type) {
        case 'SET_NOTIFICATION_SYSTEM':
            return { ...state, notificationSystem: action.payload }

        case 'PURGE_NOTIFICATIONS':
            return {
                ...state,
            }

        case 'NOTIFY':
            if (state && state.notificationSystem && state.notificationSystem.current)
                state?.notificationSystem?.current?.addNotification(action.payload)
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
    notificationSystem: RefObject<System>
    children: ReactNode
}

const initialValues: IUiContext = {
    notificationSystem: undefined,
}

const initializer = (init: IUiContext) => init

export const UiContextProvider = (props: IUiContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialValues, initializer)

    useEffect(() => {
        if (props.notificationSystem) dispatch({ type: 'SET_NOTIFICATION_SYSTEM', payload: props.notificationSystem })
    }, [props.notificationSystem])

    return <UiContext.Provider value={{ state, dispatch }}>{props.children}</UiContext.Provider>
}

export default UiContext
