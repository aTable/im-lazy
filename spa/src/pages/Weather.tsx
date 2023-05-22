import React, { useEffect, useMemo, useState } from 'react'
import { IWeatherForecast } from '../types/server'
import { getWeather } from '../api/api'
import BeastTable from '../components/BeastTable'
import { Column } from 'react-table'

interface IHomeProps {}

const Weather = (_: IHomeProps) => {
    const [weather, setWeather] = useState<IWeatherForecast[]>()
    const columns = useMemo<Column<IWeatherForecast>[]>(() => weatherColumns, [])

    useEffect(() => {
        getWeather().then(setWeather)
    }, [])

    return (
        <div className="container">
            <h2>Weather Forecast</h2>
            <BeastTable isShowPagination={false} columns={columns} data={weather ?? []} totalCount={weather?.length} />

            <br />
        </div>
    )
}

export default Weather

const weatherColumns = [
    {
        Header: 'Weather Forecast',
        columns: [
            {
                Header: 'Id',
                accessor: 'date',
            },
            {
                Header: 'Temperature C',
                accessor: 'temperatureC',
            },
            {
                Header: 'Temperature F',
                accessor: 'temperatureF',
            },
            {
                Header: 'Summary',
                accessor: 'summary',
            },
        ],
    },
]
