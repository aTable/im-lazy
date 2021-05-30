interface ISigninOidc {
    store: any
}

const SigninOidc = (_: ISigninOidc) => {
    return (
        <div className="container">
            <h1>Signing in ...</h1>
        </div>
    )
}

export default SigninOidc
