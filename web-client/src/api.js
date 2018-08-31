import { Promise } from 'bluebird'
import axios from 'axios'
import config from './config'

const serverAxios = axios.create({
  baseURL: config.serverUri,
})

export function setBearerToken(token) {
  serverAxios.defaults.headers.Authorization = `Bearer ${token}`
}

serverAxios.interceptors.request.use(onAxiosBegin, null)
serverAxios.interceptors.response.use(null, onAxiosError)

function onAxiosBegin(config) {
  if (!serverAxios.defaults.headers.Authorization) config.headers.Authorization = serverAxios.defaults.headers.Authorization
  return config
}

function onAxiosError(err) {
  if (!err.response) {
    return Promise.reject(err)
  } else if (err.response.status === 401) {
    window.location.href = '#/login'
    // auto refresh token
    // return getToken().then((res) => {
    //   setBearerToken(res.access_token)
    //   err.config.headers.Authorization = 'Bearer ' + res.access_token
    //   return axios.request(err.config)
    // })
  } else {
    return Promise.reject(err)
  }
}

export function get2LeggedToken() {
  return Promise.resolve({
    access_token: 'your access token',
    expires_in: 3600,
  })

  // const data = new window.URLSearchParams()
  // data.append("client_id", "blahhhh")
  // data.append("scope", "scopes_go_here")

  // return new Promise((resolve, reject) => {
  //   serverAxios
  //     .post(`/api/auth`, data, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       }
  //     })
  //     .then(res => resolve(res.data))
  //     .catch(err => reject(err))
  // })
}
