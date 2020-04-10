import React from 'react'
import ReactDOM from 'react-dom'
import ShowWeatherForecast from './ShowWeatherForecast'
import renderer from 'react-test-renderer'
import { IWeatherForecast } from '../types/server'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ShowWeatherForecast />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders loading', () => {
    const component = renderer.create(<ShowWeatherForecast weather={[]} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders forecast', () => {
    const weather: IWeatherForecast[] = [
        {
            date: new Date(0),
            summary: 'dis b hot',
            temperatureC: 1000,
            temperatureF: 1000,
        },
    ]
    const component = renderer.create(<ShowWeatherForecast weather={weather} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
