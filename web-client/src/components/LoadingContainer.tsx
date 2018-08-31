import React, { FC } from 'react'
import Loading from './Loading'

export interface ILoadingContainerProps {
    isLoading: boolean
    children: any
}
const LoadingContainer: FC<ILoadingContainerProps> = ({ isLoading, children }) => {
    return (
        <>
            {isLoading && <Loading />}
            {children}
        </>
    )
}

export default LoadingContainer
