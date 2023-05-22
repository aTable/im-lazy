import {
    useAddSpeakerMutation,
    AddSpeakerInput,
    useGetSpecificSpeakerByIdQuery,
    DeleteSpeakerInput,
    useDeleteSpeakerMutation,
    UpdateSpeakerInput,
    useUpdateSpeakerMutation,
} from '../generated/graphql'
import { graphClient, queryClient } from '../App-state'
import { Field, FormikProvider, useFormik } from 'formik'
import { object, string, SchemaOf, number } from 'yup'
import { nameof } from '../utils/utils'
import FormConnectedTextField from '../components/FormConnectedTextField'
import FormConnectedTextArea from '../components/FormConnectedTextArea'
import { Navigate, useNavigate, useParams } from 'react-router'

const addSpeakerSchema: SchemaOf<AddSpeakerInput> = object({
    name: string().required(),
    bio: string().optional(),
    webSite: string().optional(),
})

const updateSpeakerSchema: SchemaOf<UpdateSpeakerInput> = object({
    id: number().required(),
    name: string().required(),
    bio: string().optional(),
    webSite: string().optional(),
})

const isValidRouteId = (id: string | undefined) => (!!id && id.length > 0) || id === 'new'
const isValidGraphRouteId = (id: string | undefined) => !!id && id.length > 0 && id !== 'new'
const isCreating = (id: string | undefined) => !!id && id === 'new'

const Speaker = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { error, data, isLoading } = useGetSpecificSpeakerByIdQuery(
        graphClient,
        {
            id: id!,
        },
        {
            enabled: isValidGraphRouteId(id),
        }
    )
    const addSpeaker = useAddSpeakerMutation(graphClient, {
        onSuccess: (result, variables, context) => {
            addForm.resetForm()
            queryClient.invalidateQueries('GetSpeakers')
        },
    })
    const updateSpeaker = useUpdateSpeakerMutation(graphClient, {
        onSuccess: (result, variables, context) => {
            updateForm.resetForm()
            queryClient.invalidateQueries('GetSpeakers')
        },
    })
    const deleteSpeaker = useDeleteSpeakerMutation(graphClient, {
        onSuccess: () => {
            deleteForm.resetForm()
            queryClient.invalidateQueries('GetSpeakers')
            navigate('/speakers')
        },
    })

    const deleteForm = useFormik<DeleteSpeakerInput>({
        initialValues: { id: 111111111111 },
        onSubmit: (values) => {
            if (!window.confirm('Are you sure you want to delete?')) return
            console.log('deleteing ....')
            deleteSpeaker.mutateAsync({ speaker: values })
        },
    })

    const addForm = useFormik<AddSpeakerInput>({
        initialValues: data?.speakerById || { name: '', webSite: '' },
        onSubmit: () => {
            addSpeaker.mutateAsync({
                speaker: addForm.values,
            })
        },
        validationSchema: addSpeakerSchema,
        enableReinitialize: true,
    })

    const updateForm = useFormik<UpdateSpeakerInput>({
        initialValues: data?.speakerById || { id: 11111111111111, name: '', webSite: '' },
        onSubmit: () => {
            updateSpeaker.mutateAsync({
                speaker: updateForm.values,
            })
        },
        validationSchema: updateSpeakerSchema,
        enableReinitialize: true,
    })

    if (!isValidRouteId(id)) return <Navigate to="/" />
    if (error)
        return (
            <p>
                {/* @ts-ignore */}
                Errors broskie <code>{error.message}</code>
            </p>
        )

    return (
        <div className="container">
            <h1>
                Speaker
                {!isCreating(id) && (
                    <FormikProvider value={deleteForm}>
                        <form
                            className="needs-validation"
                            onSubmit={deleteForm.handleSubmit}
                            style={{ marginBottom: '2rem' }}
                        >
                            <button
                                className="btn btn-danger"
                                type="submit"
                                disabled={isLoading}
                                style={{ marginTop: '1rem' }}
                            >
                                <i className="bi bi-x-lg" />
                                &nbsp;Delete
                            </button>
                        </form>
                    </FormikProvider>
                )}
            </h1>

            <FormikProvider value={addForm}>
                <form
                    className="needs-validation"
                    noValidate
                    onSubmit={addForm.handleSubmit}
                    style={{ marginBottom: '2rem' }}
                >
                    <Field
                        name={nameof<AddSpeakerInput>('name')}
                        type="text"
                        component={FormConnectedTextField}
                        label="Name"
                    />
                    <Field
                        name={nameof<AddSpeakerInput>('webSite')}
                        type="text"
                        component={FormConnectedTextField}
                        label="Website"
                    />
                    <Field
                        name={nameof<AddSpeakerInput>('bio')}
                        type="text"
                        component={FormConnectedTextArea}
                        label="Biography"
                    />
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!addForm.dirty || !addForm.isValid || addSpeaker.isLoading}
                        style={{ marginTop: '1rem' }}
                    >
                        <i className="bi bi-check-circle-fill" />
                        &nbsp;Submit
                    </button>
                </form>
            </FormikProvider>
        </div>
    )
}
export default Speaker
