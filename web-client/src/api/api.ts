import axios, { AxiosResponse, AxiosError } from 'axios'
import config from '../config'
import { IWeatherForecast } from '../types/server'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    uri: config.serverUri + '/graphql',
    cache: new InMemoryCache(),
})

const backend = axios.create({
    baseURL: config.serverUri,
})
backend.interceptors.response.use(
    (res: AxiosResponse) => {
        return res.data
    },
    (err: AxiosError) => {
        console.error(err)
        if (err.response) {
            if (err.response.status === 401) {
                window.location.hash = config.loginRoute
                return Promise.reject(err)
            } else if (err.response.status === 403) {
                window.location.hash = '#/unauthorized'
                return Promise.reject(err)
            }
        }
        return Promise.reject(err)
    }
)
export function setBearer(token: string) {
    backend.defaults.headers['Authorization'] = 'Bearer ' + token
}

export function getWeather(): Promise<IWeatherForecast[]> {
    return backend.get(`/weatherforecast`)
}

export function getProtectedValue(): Promise<string[]> {
    return backend.get(`/api/protectedvalues`)
}
