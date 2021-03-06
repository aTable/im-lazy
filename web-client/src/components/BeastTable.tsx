// @ts-nochecky
import { useEffect } from 'react'
import { Column, usePagination, useTable } from 'react-table'

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
    )

    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    // Render the UI for your table
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
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
export default BeastTable
