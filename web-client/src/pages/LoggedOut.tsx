import React from 'react'

interface ILoggedOutProps {
    store: any
}

const LoggedOut = (_: ILoggedOutProps) => {
    return (
        <div className="container">
            <h1>Logged out ...</h1>
        </div>
    )
}

export default LoggedOut
