import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

class TreeList extends Component {
  static propTypes = {
    rootId: PropTypes.number,
    itemSelected: PropTypes.func,
    tree: PropTypes.object,
    render: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedIds: [],
    }
  }

  toggle(id) {
    if (this.state.selectedIds.includes(id)) {
      this.setState(prev => ({
        selectedIds: prev.selectedIds.filter(x => x !== id),
      }))
    } else {
      this.setState(prev => ({
        selectedIds: [...prev.selectedIds, id],
      }))
    }
  }

  itemSelected(id, e) {
    e.stopPropagation()
    this.toggle(id)
    if (this.props.itemSelected) this.props.itemSelected(id)
  }

  renderInstanceNode(parentId) {
    const nodes = this.props.tree[parentId]
    if (!nodes) return null

    // leaf nodes will not contain a child, perhaps shift this logic up
    //the call stack so we know if there are child nodes to an element
    //  to change the cursor
    if (!this.state.selectedIds.includes(parentId)) return null
    return (
      <ul>
        {nodes.map(childId => (
          <li key={childId} onClick={this.itemSelected.bind(this, childId)} style={{ cursor: 'pointer' }}>
            {this.props.render(childId)}
            {this.renderInstanceNode(childId)}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <ul>
        <li onClick={this.itemSelected.bind(this, this.props.rootId)} style={{ cursor: 'pointer' }}>
          {this.props.render(this.props.rootId)}
        </li>
        {this.renderInstanceNode(this.props.rootId)}
      </ul>
    )
  }
}
export default observer(TreeList)
