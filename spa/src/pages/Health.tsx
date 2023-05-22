import { useGetHealthQuery } from '../generated/graphql'
import Loading from '../components/Loading'
import { useLogin } from '../stores/hooks'
import { graphClient } from '../App-state'

interface IHealthProps {}

const PERIOD_SECONDS_RETRY = 1

const Health = (props: IHealthProps) => {
    const { isLoading, error, data } = useGetHealthQuery(
        graphClient,
        {},
        {
            refetchInterval: PERIOD_SECONDS_RETRY * 1000,
        }
    )

    const [handleLogin] = useLogin()

    if (isLoading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Health</h1>
            <p>
                Simulates a health status page. The results are hardcoded and the API will randomly change every{' '}
                {PERIOD_SECONDS_RETRY} second{PERIOD_SECONDS_RETRY > 1 ? 's' : ''}
            </p>
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
                                if (isLoading) return <Loading />
                                if (error)
                                    return (
                                        <div>
                                            {/* @ts-ignore */}
                                            <pre>{error}</pre>
                                            <button className="btn btn-secondary btn-xs" onClick={handleLogin}>
                                                Get Access
                                            </button>
                                        </div>
                                    )
                                if (!data)
                                    return <button className="btn btn-sm btn-secondary">Get super secret status</button>
                                return (
                                    <p>
                                        <span className="text-info">{data?.health?.databaseStatus}</span>
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
