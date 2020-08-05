import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GetArtistQuery, GetArtistDocument } from '../generated/graphql'
import { useParams } from 'react-router-dom'
interface IArtistProps {}

const Artists: FC<IArtistProps> = () => {
    const { artistId } = useParams()
    const { loading, error, data } = useQuery<GetArtistQuery>(GetArtistDocument, {
        variables: {
            id: artistId,
        },
    })

    if (loading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Artist</h1>
            <h2> {data?.artist?.name}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Released</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.artist?.albums?.map((x) => (
                        <tr key={x?.id}>
                            <td>{x?.name}</td>
                            <td>{x?.releaseDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Artists
