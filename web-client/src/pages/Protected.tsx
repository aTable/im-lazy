import React, { FC, useEffect, useState } from 'react'
import { getProtectedValue, getGraphQlThing } from '../api'

interface IProtectedProps {}

const Protected: FC<IProtectedProps> = () => {
    const [values, setValues] = useState<string[]>([])
    const [graphQlThing, setGraphQlThing] = useState<any>([])

    useEffect(() => {
        getProtectedValue().then(res => setValues(res))

        getGraphQlThing().then((res: any) => setGraphQlThing(res))
    }, [])
    return (
        <div className="container">
            <h1>Protected</h1>

            <p>Content on this page is only accessible when authenticated and authorized</p>
            <p>Your top secret values are:</p>
            <ul>
                {values.map(x => (
                    <li key={x.toString()}>{x}</li>
                ))}
            </ul>

            <code>{graphQlThing}</code>
        </div>
    )
}
export default Protected
