import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import logo from '../logo.svg'

export default inject(stores => ({ ...stores }))(
  observer(
    class Home extends Component {
      render() {
        return (
          <div className="container">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
              {this.props.store.name} at {this.props.store.nameLength} characters <i className="fas fa-folder" />
            </div>
          </div>
        )
      }
    }
  )
)
