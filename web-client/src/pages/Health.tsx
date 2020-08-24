import React from 'react'
import { useQuery } from '@apollo/client'
import {
    GetHealthDocument,
    GetHealthDetailedDocument,
    GetHealthQuery,
    GetHealthDetailedQuery,
} from '../generated/graphql'
import Loading from '../components/Loading'
import { useLogin } from '../stores/hooks'

interface IHealthProps {}

const Health = (props: IHealthProps) => {
    const { loading, error, data } = useQuery<GetHealthQuery>(GetHealthDocument, {
        pollInterval: 500,
    })

    const healthDetailed = useQuery<GetHealthDetailedQuery>(GetHealthDetailedDocument)
    const [handleLogin] = useLogin()

    if (loading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Health</h1>
            <table className="table table-sm">
                <colgroup>
                    <col span={1} style={{ width: '25%' }}></col>
                    <col span={1} style={{ width: '75%' }}></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>API</td>
                        <td>
                            {data?.health?.apiStatus === 'we good' ? (
                                <span className="text-success">{data?.health?.apiStatus}</span>
                            ) : (
                                <span className="text-danger">{data?.health?.apiStatus}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Database</td>
                        <td>
                            {(() => {
                                if (healthDetailed.loading) return <Loading />
                                if (healthDetailed.error)
                                    return (
                                        <div>
                                            <pre>{healthDetailed.error.message}</pre>
                                            <button className="btn btn-secondary btn-xs" onClick={handleLogin}>
                                                Get Access
                                            </button>
                                        </div>
                                    )
                                if (!healthDetailed.data)
                                    return <button className="btn btn-sm btn-secondary">Get super secret status</button>
                                return (
                                    <p>
                                        <span className="text-info">{healthDetailed.data.health?.databaseStatus}</span>
                                    </p>
                                )
                            })()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Health
