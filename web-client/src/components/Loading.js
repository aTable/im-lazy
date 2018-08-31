import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 100, transform: 'translate(-50%, -50%)' }}>
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
}
