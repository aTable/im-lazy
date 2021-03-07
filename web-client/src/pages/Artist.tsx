import React, { useContext } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import {
    GetArtistQuery,
    GetArtistDocument,
    UpdateArtistMutation,
    UpdateArtistDocument,
    DeleteAlbumMutation,
    DeleteAlbumDocument,
    MyRating,
} from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'
import { useFormik } from 'formik'
import { string, object } from 'yup'
import LoadingRoot from '../components/LoadingRoot'
import UiContext from '../stores/UiContext'

const updateArtistSchema = object().shape({
    artistName: string().required().min(2),
})

interface IUpdateArtistFormData {
    artistName: string
}

interface RouteParams {
    artistId: string
}

interface IArtistProps extends RouteComponentProps<RouteParams> {}

const Artists = (props: IArtistProps) => {
    const uiContext = useContext(UiContext)
    const { loading, error, data, refetch } = useQuery<GetArtistQuery>(GetArtistDocument, {
        variables: {
            id: parseInt(props.match.params.artistId, 10),
        },
    })
    const [updateArtist] = useMutation<UpdateArtistMutation>(UpdateArtistDocument, {
        update(cache, res) {
            cache.modify({
                fields: {
                    artists(existingArtists = []) {
                        const newArtistRef = cache.writeFragment({
                            data: res.data?.updateArtist,
                            fragment: gql`
                                fragment UpdateArtist on Artist {
                                    id
                                    name
                                }
                            `,
                        })
                        // TODO: learn mutating cache even though it is automatic for single entity changes
                        return [...existingArtists, newArtistRef]
                    },
                },
            })
        },
        onCompleted(res) {
            refetch()
            uiContext.dispatch({
                type: 'TOAST',
                payload: {
                    content: 'Updated details successfully',
                    options: { type: 'success' },
                },
            })
        },
    })
    const [deleteAlbum] = useMutation<DeleteAlbumMutation>(DeleteAlbumDocument, {
        onCompleted() {
            refetch()
            uiContext.dispatch({
                type: 'TOAST',
                payload: {
                    content: 'Removed album successfully',
                    options: { type: 'success' },
                },
            })
        },
    })

    const {
        handleSubmit,
        handleChange,
        isSubmitting,
        dirty,
        values,
        errors,
        isValid,
    } = useFormik<IUpdateArtistFormData>({
        initialValues: {
            artistName: data?.artist?.name! || '',
        },
        onSubmit(values) {
            updateArtist({
                variables: {
                    artist: {
                        name: values.artistName,
                        id: parseInt(props.match.params.artistId, 10),
                    },
                },
            })
        },
        validationSchema: updateArtistSchema,
        enableReinitialize: true,
    })

    if (loading) return <LoadingRoot />
    if (error) return <p>Errors broskie</p>

    return (
        <div className="container">
            <h1>Artist</h1>

            <form onSubmit={handleSubmit} noValidate style={{ marginBottom: '2rem' }}>
                <div className="form-group">
                    <label htmlFor="artistName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="artistName"
                        aria-describedby="artistNameHelp"
                        placeholder="Enter Artist Name"
                        onChange={handleChange}
                        value={values.artistName}
                    />
                    {errors.artistName && <span className="text-danger">{errors.artistName}</span>}
                    <small id="artistNameHelp" className="form-text text-muted">
                        The name of the artist
                    </small>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isValid || !dirty || isSubmitting}>
                    Submit
                </button>
            </form>

            <h2>Albums</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Released</th>
                        <th>My Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.artist?.albums?.map((x) => (
                        <tr key={x?.id}>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.youtube.com/results?search_query=${data?.artist?.name?.replaceAll(
                                        ' ',
                                        '+'
                                    )}+${x?.name?.replaceAll(' ', '+')}`}
                                >
                                    {x?.name}
                                </a>
                            </td>
                            <td>{x?.releaseDate}</td>
                            <td className="text-center">
                                {(() => {
                                    if (!x || !x.myRating) return null
                                    switch (x.myRating) {
                                        case MyRating.None:
                                            return <i className="fas fa-meh-blank" />
                                        case MyRating.Okayish:
                                            return <i className="fas fa-meh" />
                                        case MyRating.Legendary:
                                            return <i className="fas fa-star" />
                                    }
                                })()}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteAlbum({ variables: { album: { albumId: x?.id! } } })}
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Artists
