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
    hasPrevious: boolean
    hasNext: boolean
    previous: string
    next: string
}

export interface Todo {
    id: number
    label: string
    isDone: boolean
}
export interface TodoJsx extends Todo {
    isDoneJsx: ReactNode | null
    actionsJsx: ReactNode | null
}
