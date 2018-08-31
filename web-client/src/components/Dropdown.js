import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

export default observer(
  class Dropdown extends Component {
    static propTypes = {
      label: PropTypes.string,
      selectHtmlName: PropTypes.string,
      isDisabled: PropTypes.bool,
      defaultValue: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    }

    render() {
      return (
        <div className="form-group row">
          <label className="col-3 col-form-label">{this.props.label}</label>
          <div className="col-9">
            <select
              name={this.props.selectHtmlName}
              className="form-control"
              disabled={this.props.isDisabled}
              defaultValue={this.props.defaultValue}
              value={this.props.value}
              onChange={this.props.onChange}
            >
              <option value="">Select ...</option>
              {this.props.options}
            </select>
          </div>
        </div>
      )
    }
  }
)
