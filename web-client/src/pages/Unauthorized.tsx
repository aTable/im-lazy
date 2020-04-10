import React, { FC } from 'react'

const Unauthorized: FC<{}> = () => {
    return (
        <div className="container">
            <h1>Unauthorized</h1>

            <p>You have insufficient permissions to perform that action</p>
        </div>
    )
}

export default Unauthorized
