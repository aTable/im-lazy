import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

export default inject(stores => ({ ...stores }))(
  observer(
    class Home extends Component {
      render() {
        return (
          <div className="container">
            <h1>Protected</h1>

            <p>Content on this page is only accessible when authenticated and authorized</p>

            <p>
              <strong>Your token:</strong> {this.props.store.authStore.token}
            </p>
          </div>
        )
      }
    }
  )
)
