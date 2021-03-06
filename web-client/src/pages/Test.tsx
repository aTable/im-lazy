import React, { useCallback, useMemo, useState } from 'react'

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

    // const dataQuery = useQuery(
    //     ['todos', queryPageNumber, queryPageSize],
    //     () => getTodos(queryPageNumber, queryPageSize),
    //     {
    //         // keepPreviousData: true,
    //         //  staleTime: 5000,
    //         onSuccess: (data) => {
    //             // setTableData(mappedData)
    //         },
    //     }
    // )
    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        return getTodos(pageIndex + 1, pageSize).then((res) => {
            setData(res.records)
            setPageCount(res.metadata.pageCount)
            setTotalCount(res.metadata.total)
            setLoading(false)
        })
    }, [])

    return (
        <BeastTable
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
        />
    )
}

export default Test
