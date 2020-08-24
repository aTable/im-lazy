import React from 'react'
import { useLogin } from '../stores/hooks'

export interface ILoginProps {}

const Login = (props: ILoginProps) => {
    const [handleLogin] = useLogin()

    return (
        <div className="container">
            <p>You will be redirected to the IdentityServer</p>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default Login
