import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GetHealthDocument, GetHealthQuery } from '../generated/graphql'

interface IHealthProps {}

const Health: FC<IHealthProps> = () => {
    const { loading, error, data } = useQuery<GetHealthQuery>(GetHealthDocument)

    if (loading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Health</h1>
            <p>
                <strong>API:</strong> {data?.health?.apiStatus}
            </p>
        </div>
    )
}
export default Health
