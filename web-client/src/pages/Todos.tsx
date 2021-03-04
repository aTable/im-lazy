import React, { useEffect } from 'react'
import { getTodos } from '../api/api'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

interface ITodosProps {
    store: any
}

const Todos = (_: ITodosProps) => {
    const { data } = useQuery('todos', getTodos)

    useEffect(() => {}, [])
    return (
        <div className="container">
            <p>A RESTful implementation</p>

            <Link to={`/todos/0`}>
                <button className="btn btn-primary">
                    <i className="fa fa-plus" />
                    &nbsp;Create
                </button>
            </Link>
            <br />
            <br />

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
                    {data?.map((x) => (
                        <tr key={x.id}>
                            <td>{x.id}</td>
                            <td>{x.label}</td>
                            <td>{x.isDone ? <i className="fa fa-check" /> : null}</td>
                            <td>
                                <Link to={`/todos/${x.id}`}>
                                    <i className="fa fa-eye" />
                                    &nbsp;Open
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Todos
