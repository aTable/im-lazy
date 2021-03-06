import React, { useCallback, useEffect, useMemo, useState } from 'react'

import BeastTable from '../components/BeastTable'
import { getTodos } from '../api/api'
import { Todo } from '../types/server'
import { useQuery } from 'react-query'

function Test() {
    const columns = useMemo(
        () => [
            {
                Header: 'Todo',
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
                        accessor: 'isDone',
                    },
                ],
            },
        ],
        []
    )

    const [data, setData] = useState<Todo[]>([])
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
        <BeastTable
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
            defaultPageSize={queryPageSize}
        />
    )
}

export default Test
