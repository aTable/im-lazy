import React, { useEffect, useState } from 'react'
import { getProtectedValue } from '../api/api'

interface IProtectedProps {}

const Protected = (props: IProtectedProps) => {
    const [values, setValues] = useState<string[]>([])
    useEffect(() => {
        getProtectedValue()
            .then((res) => setValues(res))
            .catch((err) =>
                console.log('error boundaries dont catch async errors so caughting this cause its getting annoying')
            )
    }, [])
    return (
        <div className="container">
            <h1>Protected</h1>

            <p>Content on this page is only accessible when authenticated and authorized</p>
            <p>Your top secret values are:</p>
            <ul>
                {values.map((x) => (
                    <li key={x.toString()}>{x}</li>
                ))}
            </ul>
        </div>
    )
}
export default Protected
