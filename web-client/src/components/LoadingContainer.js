import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

export default class LoadingContainer extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
  }
  render() {
    return (
      <div>
        {this.props.isLoading && <Loading />}
        {this.props.children}
      </div>
    )
  }
}
