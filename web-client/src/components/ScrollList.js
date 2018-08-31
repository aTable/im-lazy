import React, { Component } from 'react'
import PropTypes from 'prop-types'

const defaults = {
  cssHeight: '250px',
}

export default class ScrollList extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    renderRecord: PropTypes.func.isRequired,
    cssHeight: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.cssHeight = this.props.cssHeight || defaults.cssHeight
  }

  render() {
    const records = this.props.records.map(this.props.renderRecord)

    return (
      <div className="scrolled-list" style={{ height: this.cssHeight, overflowY: 'auto' }}>
        {records}
      </div>
    )
  }
}
