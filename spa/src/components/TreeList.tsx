import React, { FC } from 'react'
export interface ITreeListProps {
    rootId: number
    itemSelected: () => void
    tree: any
    render: () => void
}

// TODO: cant make this compile friendly without actually using hooks
const TreeList = (props: ITreeListProps) => {
    return null
    // this.state = {
    //   selectedIds: [],
    // }
    // const toggle = (id: number) => {
    //   if (this.state.selectedIds.includes(id)) {
    //     this.setState(prev => ({
    //       selectedIds: prev.selectedIds.filter(x => x !== id),
    //     }))
    //   } else {
    //     this.setState(prev => ({
    //       selectedIds: [...prev.selectedIds, id],
    //     }))
    //   }
    // }
    // const itemSelected = (id: number, e: any) => {
    //   e.stopPropagation()
    //   toggle(id)
    //   if (props.itemSelected) props.itemSelected(id)
    // }
    // const renderInstanceNode = (parentId: number) => {
    //   const nodes = props.tree[parentId]
    //   if (!nodes) return null
    //   // leaf nodes will not contain a child, perhaps shift this logic up
    //   // the call stack so we know if there are child nodes to an element
    //   //  to change the cursor
    //   if (!state.selectedIds.includes(parentId)) return null
    //   return (
    //     <ul>
    //       {nodes.map((childId: number) => (
    //         <li key={childId} onClick={itemSelected.bind(null, childId)} style={{ cursor: 'pointer' }}>
    //           {props.render(childId)}
    //           {renderInstanceNode(childId)}
    //         </li>
    //       ))}
    //     </ul>
    //   )
    // }
    // return (
    //   <ul>
    //     <li onClick={itemSelected.bind(null, props.rootId)} style={{ cursor: 'pointer' }}>
    //       {props.render(props.rootId)}
    //     </li>
    //     {renderInstanceNode(props.rootId)}
    //   </ul>
    // )
}

export default TreeList
