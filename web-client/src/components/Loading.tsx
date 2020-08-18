import React from 'react'

export interface ILoadingProps {}

const Loading = (props: ILoadingProps) => {
    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Loading
