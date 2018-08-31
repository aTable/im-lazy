import React, { FC, useCallback } from 'react'

export function useLogin(): [() => void] {
    const handleLogin = useCallback(() => {
        // @ts-ignore
        window.mgr
            .signinRedirect()
            .then((res: any) => {
                console.log('login success', res)
            })
            .catch((error: any) => {
                console.error(error)
            })
    }, [])

    return [handleLogin]
}

export interface ILoginProps {}

const Login: FC<ILoginProps> = props => {
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
