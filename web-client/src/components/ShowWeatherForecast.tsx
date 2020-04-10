import React from 'react'
import { IWeatherForecast } from '../types/server'

export interface IShowWeatherForecastProps {
    weather?: IWeatherForecast[]
}

const ShowWeatherForecast = (props: IShowWeatherForecastProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Summary</th>
                    <th>Temp (C)</th>
                    <th>Temp (F)</th>
                </tr>
            </thead>
            <tbody>
                {!props.weather || (props.weather.length <= 0 && <p>No weather data</p>)}
                {props.weather?.map(x => (
                    <tr key={x.date.toString()}>
                        <td>{x.date.toString()}</td>
                        <td>{x.summary}</td>
                        <td>{x.temperatureC}</td>
                        <td>{x.temperatureF}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ShowWeatherForecast
