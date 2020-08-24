import { useCallback } from 'react'

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
