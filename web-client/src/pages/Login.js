import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

export default inject(stores => ({ ...stores }))(
  observer(
    class Login extends Component {
      submit(e) {
        e.preventDefault()
        this.props.store.authStore.authorize().then(() => {
          this.props.history.replace('/protected')
          this.props.uiStore.notify('Success', 'Logged in successfully')
        })
      }

      render() {
        return (
          <div className="container">
            <h1>Login</h1>

            <form onSubmit={this.submit.bind(this)}>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="staticEmail" defaultValue="email@example.com" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )
      }
    }
  )
)
