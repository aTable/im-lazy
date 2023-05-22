import React from 'react'
import { useLogin } from '../stores/hooks'

export interface ILoginProps {}

const Login = (props: ILoginProps) => {
    const [handleLogin] = useLogin()

    return (
        <div className="container">
            <h1>Access Denied</h1>
            <p>Please login to continue - you will be redirected to the authorization server</p>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
                <i className="bi bi-lock" /> Login Now
            </button>
        </div>
    )
}

export default Login
