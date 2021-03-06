export interface IWeatherForecast {
    date: Date
    temperatureC: number
    temperatureF: number
    summary: string
}

export interface Paged<T> {
    metadata: PagedMetadata
    records: T[]
}
export interface PagedMetadata {
    total: number
    pageSize: number
    pageNumber: number
    pageCount: number
}

export interface Todo {
    id: number
    label: string
    isDone: boolean
}
