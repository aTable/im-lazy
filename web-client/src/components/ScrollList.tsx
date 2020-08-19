import React, { FC } from 'react'

const defaults = {
    cssHeight: '250px',
}

export interface IScrollListProps {
    records: any[]
    renderRecord: (value: any, index: number, source: any[]) => any
    cssHeight: string
}

const ScrollList = (props: IScrollListProps) => {
    const cssHeight = props.cssHeight || defaults.cssHeight
    const records = props.records.map(props.renderRecord)

    return (
        <div className="scrolled-list" style={{ height: cssHeight, overflowY: 'auto' }}>
            {records}
        </div>
    )
}

export default ScrollList
