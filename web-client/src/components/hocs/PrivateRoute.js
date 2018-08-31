import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

export default inject('store')(
  observer(
    class PrivateRoute extends Component {
      static propTypes = {
        component: PropTypes.func.isRequired,
      }

      renderRoute(Component) {
        if (this.props.store.authStore.isAuthenticated) {
          return <Component />
        } else {
          const redirectParams = {
            pathname: '/Login',
            state: { from: this.props.location },
          }
          return <Redirect to={redirectParams} />
        }
      }

      render() {
        const { component, ...props } = this.props

        return <Route {...props} render={this.renderRoute.bind(this, component)} />
      }
    }
  )
)
