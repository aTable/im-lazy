import React, { FC, useState } from 'react'
import { useQuery, useMutation, disableFragmentWarnings, gql } from '@apollo/client'
import { GetArtistsDocument, GetArtistsQuery, CreateArtistDocument, CreateArtistMutation } from '../generated/graphql'
import { Link } from 'react-router-dom'

interface IArtistProps {}

const Artists: FC<IArtistProps> = () => {
    const [newArtistName, setNewArtistName] = useState('')
    const { loading, error, data } = useQuery<GetArtistsQuery>(GetArtistsDocument)
    const [createArtist] = useMutation<CreateArtistMutation>(CreateArtistDocument, {
        update(cache, res) {
            cache.modify({
                fields: {
                    artists(existingArtists = []) {
                        const newArtistRef = cache.writeFragment({
                            data: res.data?.createArtist,
                            fragment: gql`
                                fragment NewTodo on Todo {
                                    id
                                    type
                                }
                            `,
                        })
                        return [...existingArtists, newArtistRef]
                    },
                },
            })
        },
        onCompleted(res) {
            setNewArtistName('')
        },
    })

    if (loading) return <p>Loading broskie</p>
    if (error) return <p>Errors broskie</p>

    const submitCreateArtist = () => {
        createArtist({
            variables: {
                artist: {
                    name: newArtistName,
                },
            },
        })
    }

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
                <tfoot>
                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={newArtistName}
                                onChange={(e) => setNewArtistName(e.target.value)}
                            />
                        </td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submitCreateArtist}
                                disabled={!newArtistName}
                            >
                                <i className="fas fa-plus" /> Add
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default Artists
