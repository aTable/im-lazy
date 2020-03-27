import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../stores/AuthContext'

interface IHomeProps {
    store: any
}

const Home = (_: IHomeProps) => {
    const { state, dispatch } = useContext(AuthContext)
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'SET_TOKEN', payload: 'token value!' })
        }, 2000)
    }, [state, dispatch])
    return (
        <div className="container">
            <h1>A boilerplate ...</h1>
            <p>... to let you build things quicker</p>
            <p>Token: {state.token}</p>
        </div>
    )
}

export default Home
