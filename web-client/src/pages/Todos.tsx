import React, { ReactNode, useEffect, useMemo, useState } from 'react'
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
import { Todo } from '../types/server'
import { data } from 'jquery'
interface ITodosProps {
    store: any
}
interface TodoJsx extends Todo {
    isDoneIcon: ReactNode
    actions: ReactNode
}

const Todos = (_: ITodosProps) => {
    const [queryPageNumber, setQueryPageNumber] = useState(1)
    const [queryPageSize, setQueryPageSize] = useState(5)

    const dataQuery = useQuery(
        ['todos', queryPageNumber, queryPageSize],
        () => getTodos(queryPageNumber, queryPageSize),
        {
            // keepPreviousData: true,
            //  staleTime: 5000,
            onSuccess: (data) => {
                // setTableData(mappedData)
            },
        }
    )

    const tableData = useMemo<TodoJsx[]>(() => {
        if (!dataQuery.data) return []
        const mappedData = dataQuery.data.records?.map((x) => ({
            ...x,
            isDoneIcon: x.isDone ? <i className="fa fa-check" /> : null,
            actions: (
                <>
                    <Link to={`/todos/${x.id}`}>
                        <i className="fa fa-eye" />
                        &nbsp;Open
                    </Link>
                </>
            ),
        }))
        return mappedData
    }, [dataQuery.data, queryPageSize, queryPageNumber])

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
                    { Header: 'Is Done', accessor: 'isDoneIcon' },
                    { Header: 'Actions', accessor: 'actions' },
                ],
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        page,
        state: { pageIndex, pageSize },
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        canPreviousPage,
        canNextPage,
    } = useTable<TodoJsx>(
        {
            columns: columns,
            data: tableData,
            // @ts-ignore
            initialState: { pageIndex: 0, pageSize: 5 },
            manualPagination: true,
            pageCount: dataQuery && dataQuery.data?.metadata.pageCount,
            //pageOptions: [5, 8, 10, 25, 100],
        },
        useSortBy,
        usePagination
    ) as TableInstance<TodoJsx> & UsePaginationInstanceProps<TodoJsx> & { state: UsePaginationState<TodoJsx> }

    useEffect(() => {
        //data: dataQuery.refetch({})
        console.log('pageIndex:', pageIndex, ', pageSize:', pageSize)
        setQueryPageNumber(pageIndex + 1)
        setQueryPageSize(pageSize)
        console.trace()
    }, [pageIndex, pageSize])

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

            <table className="table table-sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <div>
                                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous Page
                                </button>
                                <button onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next Page
                                </button>
                                <div>
                                    Page {pageIndex + 1} of {pageOptions.length}
                                </div>
                                {/* <div>Go to page:</div> */}
                                {/* <input
                                    type="number"
                                    defaultValue={pageIndex + 1 || 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        gotoPage(page)
                                    }}
                                /> */}
                                {/* <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {pageOptions.map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select> */}
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Todos
