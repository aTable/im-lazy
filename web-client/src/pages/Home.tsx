import React, { useEffect, useState } from 'react'
import { IWeatherForecast } from '../types/server'
import { getWeather } from '../api/api'
import ShowWeatherForecast from '../components/ShowWeatherForecast'

interface IHomeProps {
    store: any
}

const Home = (_: IHomeProps) => {
    const [weather, setWeather] = useState<IWeatherForecast[]>()

    useEffect(() => {
        getWeather().then(setWeather)
    }, [])
    return (
        <div className="container">
            <h1>A boilerplate ...</h1>
            <p>... to let you build things quicker</p>
            <ShowWeatherForecast weather={weather} />
        </div>
    )
}

export default Home
