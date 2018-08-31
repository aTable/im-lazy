import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

export default withRouter(
  observer(
    class NavItem extends Component {
      static propTypes = {
        disabled: PropTypes.bool,
        to: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
      }

      isActive() {
        return this.props.location.pathname === this.props.to
      }

      linkClicked(e) {
        if (this.props.disabled || this.isActive()) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
      }

      render() {
        const activeClassName = this.isActive() ? 'active' : ''
        return (
          <li className={`nav-item ${activeClassName}`}>
            <Link to={this.props.to} className={`nav-link ${this.props.disabled ? 'disabled' : ''}`} onClick={this.linkClicked.bind(this)}>
              {this.props.children} {this.isActive() ? <span className="sr-only">(current)</span> : null}
            </Link>
          </li>
        )
      }
    }
  )
)
