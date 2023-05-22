import React from 'react'

export interface ILoadingProps {}

const Loading = (props: ILoadingProps) => {
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Loading
