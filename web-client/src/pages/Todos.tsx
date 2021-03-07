import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getTodos } from '../api/api'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {
    Column,
    TableInstance,
    usePagination,
    UsePaginationInstanceProps,
    UsePaginationState,
    useSortBy,
    useTable,
} from 'react-table'
import { Todo, TodoJsx } from '../types/server'
import BeastTable from '../components/BeastTable'
import UiContext from '../stores/UiContext'
interface ITodosProps {
    store: any
}

const Todos = (_: ITodosProps) => {
    const columns = useMemo<Column<TodoJsx>[]>(
        () => [
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
        ],
        []
    )
    const [data, setData] = useState<Todo[]>([])
    const [tableData, setTableData] = useState<TodoJsx[]>([])
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [queryPageSize, setQueryPageSize] = useState(5)
    const [queryPageNumber, setQueryPageNumber] = useState(1)

    const dataQuery = useQuery(
        ['todos', queryPageNumber, queryPageSize],
        () => getTodos(queryPageNumber, queryPageSize),
        {
            // keepPreviousData: true,
            //  staleTime: 5000,
            onSuccess: (data) => {
                setData(data.records)
                const mappedData = data.records?.map((x) => ({
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
                }))
                setTableData(mappedData)
                setPageCount(data.metadata.pageCount)
                setTotalCount(data.metadata.total)
                setLoading(false)
            },
        }
    )
    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        setQueryPageNumber(pageIndex + 1)
        setQueryPageSize(pageSize)
    }, [])

    useEffect(() => {
        console.log('pageNumber:', queryPageNumber, 'pageSize', queryPageSize)
    }, [queryPageNumber, queryPageSize])
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
                data={tableData}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                totalCount={totalCount}
                defaultPageSize={queryPageSize}
            />
        </div>
    )
}

export default Todos
