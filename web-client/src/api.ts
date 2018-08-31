import axios, { AxiosResponse, AxiosError } from 'axios'
import config from './config'

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
            }
        }
        return Promise.reject(err)
    }
)
export function setBearer(token: string) {
    backend.defaults.headers['Authorization'] = 'Bearer ' + token
}

export function getWeather() {
    return backend.get(`/weatherforecast`)
}

export function getProtectedValue(): Promise<string[]> {
    return backend.get(`/api/protectedvalues`)
}
