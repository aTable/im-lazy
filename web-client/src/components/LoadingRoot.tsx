import React from 'react'
import Loading from './Loading'

export interface ILoadingRootProps {}

const LoadingRoot = (props: ILoadingRootProps) => {
    return (
        <div className="container text-center" style={{ marginTop: '3rem' }}>
            <Loading />
        </div>
    )
}

export default LoadingRoot
