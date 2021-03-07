import React, { useContext } from 'react'
import { createUpdateTodo, getTodo, getTodoAssignees } from '../api/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { Field, FormikProvider, useFormik } from 'formik'
import { bool, number, object, SchemaOf, string } from 'yup'
import { Todo } from '../types/server'
import FormConnectedTextField from '../components/FormConnectedTextField'
import FormConnectedCheckbox from '../components/FormConnectedCheckbox'
import UiContext from '../stores/UiContext'
import { nameof } from '../utils/utils'

interface ITodosProps {
    store: any
}
const todoSchema: SchemaOf<Todo> = object({
    id: number().defined(),
    label: string().required(),
    isDone: bool().defined(),
})

const Todos = (_: ITodosProps) => {
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const todoId = parseInt(id, 10)
    const isEdit = todoId > 0
    const ui = useContext(UiContext)
    const queryClient = useQueryClient()
    const todo = useQuery(['todo', todoId], () => getTodo(todoId), {
        enabled: isEdit,
    })
    const todoAssignees = useQuery(['todo', todoId, 'assignees'], () => getTodoAssignees(todoId), {
        enabled: isEdit,
    })
    const mutation = useMutation(createUpdateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['todo', todoId])
            ui.dispatch({
                type: 'TOAST',
                payload: {
                    content: 'Saved Todo',
                    options: { type: 'success' },
                },
            })
            history.push(`/todos`)
        },
    })

    const form = useFormik({
        initialValues: todo.data ?? {
            id: 0,
            label: '',
            isDone: false,
        },
        enableReinitialize: true,
        onSubmit: (values: Todo) => {
            mutation.mutate(values)
        },
        validationSchema: todoSchema,
    })
    return (
        <div className="container">
            <p>{isEdit ? 'Update' : 'Create'} a todo</p>

            <FormikProvider value={form}>
                <form
                    className="needs-validation"
                    noValidate
                    onSubmit={form.handleSubmit}
                    style={{ marginBottom: '2rem' }}
                >
                    <Field
                        name={nameof<Todo>('id')}
                        readOnly
                        type="text"
                        component={FormConnectedTextField}
                        label="Id"
                    />
                    <Field name={nameof<Todo>('label')} type="text" component={FormConnectedTextField} label="Label" />
                    <Field
                        name={nameof<Todo>('isDone')}
                        type="checkbox"
                        component={FormConnectedCheckbox}
                        label="Is Done"
                    />
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!form.dirty || !form.isValid || mutation.isLoading}
                        style={{ marginTop: '1rem' }}
                    >
                        <i className="fa fa-save" />
                        &nbsp;Submit
                    </button>
                </form>
            </FormikProvider>

            {isEdit && (
                <>
                    <p>Assigned to:</p>
                    <ul>
                        {todoAssignees.data?.map((x) => (
                            <li key={x}>{x}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Todos
