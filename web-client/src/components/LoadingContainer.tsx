import React, { FC } from 'react'
import Loading from './Loading'

export interface ILoadingContainerProps {
    isLoading: boolean
    children: any
}
const LoadingContainer = ({ isLoading, children }: ILoadingContainerProps) => {
    return (
        <>
            {isLoading && <Loading />}
            {children}
        </>
    )
}

export default LoadingContainer
