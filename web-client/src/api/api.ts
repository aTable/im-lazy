import axios, { AxiosResponse, AxiosError } from 'axios'
import config from '../config'
import { IWeatherForecast } from '../types/server'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { authKeys } from '../stores/AuthContext'
import { User } from 'oidc-client'

const httpLink = createHttpLink({
    uri: `${config.serverUri}/graphql`,
})
const authLink = setContext((_, { headers }) => {
    const userSerialized = localStorage.getItem(authKeys.user)
    if (!userSerialized)
        return {
            headers: {
                ...headers,
                wtf: 'wtf',
            },
        }

    const user: User = User.fromStorageString(userSerialized)
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${user.id_token}`,
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    //headers: { wtf: 'wtf2' },
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
