import React from 'react'

interface IHomeProps {
    store: any
}

const Home = (_: IHomeProps) => {
    return (
        <div className="container">
            <h1>A boilerplate ...</h1>
            <p>... to let you build things quicker</p>
        </div>
    )
}

export default Home
