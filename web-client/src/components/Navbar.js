import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'

import NavItem from './NavItem'

export default withRouter(
  inject('store')(
    observer(
      class Navigation extends Component {
        render() {
          return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to="/">
                Boilerplate
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <NavItem to="/">Home</NavItem>
                  <NavItem to="/Disabled" disabled={true}>
                    Disabled
                  </NavItem>
                  <NavItem to="/Protected">Protected</NavItem>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>
          )
        }
      }
    )
  )
)
