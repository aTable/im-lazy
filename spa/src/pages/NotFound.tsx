import React from 'react'

interface INotFoundProps {}

const NotFound = (props: INotFoundProps) => {
    return (
        <div className="container">
            <h1>404</h1>
            <p>Page could not be found</p>
        </div>
    )
}

export default NotFound
