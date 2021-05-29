import { useCallback, useMemo, useState } from 'react'
import { getTodos } from '../api/api'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import { Todo, TodoJsx } from '../types/server'
import BeastTable from '../components/BeastTable'
interface ITodosProps {
    store: any
}

const Todos = (_: ITodosProps) => {
    const columns = useMemo<Column<TodoJsx>[]>(() => todoColumns, [])
    const [queryPageSize, setQueryPageSize] = useState(5)
    const [queryPageNumber, setQueryPageNumber] = useState(1)

    const dataQuery = useQuery(['todos', queryPageNumber, queryPageSize], () =>
        getTodos(queryPageNumber, queryPageSize)
    )

    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        setQueryPageNumber(pageIndex + 1)
        setQueryPageSize(pageSize)
    }, [])

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
            <BeastTable
                columns={columns}
                data={dataQuery.data?.records?.map(mapTodoToJsx) ?? []}
                fetchData={fetchData}
                loading={dataQuery.isLoading}
                pageCount={dataQuery.data?.metadata.pageCount}
                totalCount={dataQuery.data?.metadata.total}
                defaultPageSize={queryPageSize}
            />
        </div>
    )
}

export default Todos

const todoColumns = [
    {
        Header: 'Todos',
        columns: [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Label',
                accessor: 'label',
            },
            {
                Header: 'Is Done',
                accessor: 'isDoneJsx',
            },
            {
                Header: 'Actions',
                accessor: 'actionsJsx',
            },
        ],
    },
]

const mapTodoToJsx = (x: Todo): TodoJsx => ({
    ...x,
    isDoneJsx: x.isDone ? <i className="fa fa-check" /> : null,
    actionsJsx: (
        <>
            <Link to={`/todos/${x.id}`}>
                <i className="fa fa-eye" />
                &nbsp;Open
            </Link>
        </>
    ),
})
