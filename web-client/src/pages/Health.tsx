import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GetHealthDocument, GetHealthQuery } from '../generated/graphql'

interface IHealthProps {}

const Health: FC<IHealthProps> = () => {
    const { loading, error, data } = useQuery<GetHealthQuery>(GetHealthDocument, {
        pollInterval: 1500,
    })

    if (loading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Health</h1>
            <p>
                <strong>API: </strong>
                {data?.health?.apiStatus === 'we good' ? (
                    <span className="text-success">{data?.health?.apiStatus}</span>
                ) : (
                    <span className="text-danger">{data?.health?.apiStatus}</span>
                )}
            </p>
        </div>
    )
}
export default Health
