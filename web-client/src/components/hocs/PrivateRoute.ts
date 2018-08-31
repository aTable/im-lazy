import React, { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'

export interface IPrivateRouteProps {
    component: any
    exact: boolean
}
const PrivateRoute: FC<IPrivateRouteProps> = props => {
    const renderRoute = (component: any) => {
        // if (this.props.store.authStore.isAuthenticated) {
        //   return <Component />
        // } else {
        //   const redirectParams = {
        //     pathname: '/Login',
        //     state: { from: this.props.location },
        //   }
        //   return <Redirect to={redirectParams} />
        // }
    }

    return null
}

export default PrivateRoute
