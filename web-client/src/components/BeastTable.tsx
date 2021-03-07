// @ts-nochecky
import { useEffect } from 'react'
import {
    Column,
    TableInstance,
    usePagination,
    UsePaginationInstanceProps,
    UsePaginationState,
    useTable,
} from 'react-table'
import { TodoJsx } from '../types/server'

export interface BeastTableProps<T extends Object> {
    columns: Column<T>
    data: object[]
    controlledPageCount: number
    totalCount: number
    loading: boolean
    fetchData: any
    defaultPageSize: number
}
const BeastTable = ({
    columns,
    data,
    fetchData,
    loading,
    totalCount,
    pageCount: controlledPageCount,
    defaultPageSize,
}: any) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // @ts-ignore
        page,
        // @ts-ignore
        canPreviousPage,
        // @ts-ignore
        canNextPage,
        // @ts-ignore
        pageOptions,
        // @ts-ignore
        pageCount,
        // @ts-ignore
        gotoPage,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        setPageSize,
        // @ts-ignore
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            // @ts-ignore
            initialState: { pageIndex: 0, pageSize: defaultPageSize }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    ) //as TableInstance<TodoJsx> & UsePaginationInstanceProps<TodoJsx> & { state: UsePaginationState<TodoJsx> }

    useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (
        <>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
            <table className="table table-sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any, i: number) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan={10000}>Loading...</td>
                        ) : (
                            <td colSpan={10000}>
                                Showing {page.length} of {totalCount} results
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Table data navigation">
                <ul className="pagination">
                    <li className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                        <button
                            className="page-link"
                            aria-label="Previous"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <span aria-hidden="true">&laquo;&laquo;</span>
                        </button>
                    </li>
                    <li className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                        <button
                            className="page-link"
                            aria-label="Previous"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {pageOptions.map((x: any, i: number) => (
                        <li key={x} className={`page-item  ${pageIndex === i ? 'active' : ''}`}>
                            <button className="page-link" aria-label={x} onClick={() => gotoPage(x)}>
                                <span aria-hidden="true">{x + 1}</span>
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${canNextPage ? '' : 'disabled'}`}>
                        <button
                            className="page-link"
                            aria-label="Next"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                    <li className={`page-item ${canNextPage ? '' : 'disabled'}`}>
                        <button
                            className="page-link"
                            aria-label="Last"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            <span aria-hidden="true">&raquo;&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default BeastTable
