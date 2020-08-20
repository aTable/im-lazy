interface IWillErrorProps {
    store: any
}

const WillError = (_: IWillErrorProps) => {
    throw new Error('demonstrating an error caught by an Error Boundary')
}

export default WillError
