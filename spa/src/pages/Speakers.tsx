import { useGetSpeakersQuery } from '../generated/graphql'
import { Link } from 'react-router-dom'
import LoadingRoot from '../components/LoadingRoot'
import { graphClient } from '../App-state'

const Speakers = () => {
    const { error, data, isLoading } = useGetSpeakersQuery(graphClient)

    if (error)
        return (
            <p>
                {/* @ts-ignore */}
                Errors broskie <code>{error.message}</code>
            </p>
        )

    return (
        <div className="container">
            <h1>Speakers</h1>

            <p>
                <Link to="/speakers/new" className="btn btn-primary">
                    <i className="bi bi-plus-lg" /> Create
                </Link>
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Bio</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={10000}>
                                <LoadingRoot />
                            </td>
                        </tr>
                    )}
                    {!isLoading &&
                        data?.speakers?.nodes?.map((x) => (
                            <tr key={x?.id}>
                                <td>
                                    <Link to={`/speakers/${x?.id}/`}>{x?.name}</Link>
                                </td>
                                <td>{x?.bio}</td>
                                <td>{x?.webSite}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default Speakers
