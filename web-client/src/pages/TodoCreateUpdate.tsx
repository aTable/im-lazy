import React from 'react'
import { getTodo } from '../api/api'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { Field, FormikProvider, useFormik } from 'formik'
import { bool, number, object, SchemaOf, string } from 'yup'
import { Todo } from '../types/server'
import FormConnectedTextField from '../components/FormConnectedTextField'
import FormConnectedCheckbox from '../components/FormConnectedCheckbox'

interface ITodosProps {
    store: any
}
const todoSchema: SchemaOf<Todo> = object({
    id: number().defined(),
    label: string().required(),
    isDone: bool().isTrue().required(),
})

const Todos = (_: ITodosProps) => {
    const { id } = useParams<{ id: string }>()
    const todoId = parseInt(id, 10)
    const todo = useQuery(['todo', todoId], () => getTodo(todoId), {
        enabled: todoId > 0,
    })

    const form = useFormik({
        initialValues: {
            id: 0,
            label: '',
            isDone: false,
        },
        onSubmit: (values: Todo) => {
            console.log('submitting', values)
        },
        validationSchema: todoSchema,
    })
    return (
        <div className="container">
            <p>Create or edit an existing todo</p>

            <FormikProvider value={form}>
                <form className="needs-validation" noValidate onSubmit={form.handleSubmit}>
                    <Field name="id" type="text" component={FormConnectedTextField} label="Id" />
                    <Field name="label" type="text" component={FormConnectedTextField} label="Label" />
                    <Field name="isDone" type="checkbox" component={FormConnectedCheckbox} label="Is Done" />
                    <button className="btn btn-primary" type="submit">
                        <i className="fa fa-save" />
                        &nbsp;Submit
                    </button>
                </form>
            </FormikProvider>

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                        <th>Is Done</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.isSuccess && (
                        <tr>
                            <td>{todo.data.id}</td>
                            <td>{todo.data.label}</td>
                            <td>{todo.data.isDone ? <i className="fa fa-check" /> : null}</td>
                            <td>
                                <Link to={`/todos/${todo.data.id}`}>
                                    <i className="fa fa-eye" />
                                    &nbsp;Open
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Todos
