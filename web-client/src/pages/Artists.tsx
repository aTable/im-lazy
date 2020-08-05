import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GetArtistsDocument, GetArtistsQuery } from '../generated/graphql'
import { Link } from 'react-router-dom'

interface IArtistProps {}

const Artists: FC<IArtistProps> = () => {
    const { loading, error, data } = useQuery<GetArtistsQuery>(GetArtistsDocument)

    if (loading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Artists</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Albums</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.artists?.map((x) => (
                        <tr key={x?.id}>
                            <td>
                                <Link to={`/artists/${x?.id}/`}>{x?.name}</Link>
                            </td>
                            <td>{x?.albums?.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Artists
