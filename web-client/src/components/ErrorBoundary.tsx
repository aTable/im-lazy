import React, { Component, ReactNode, ErrorInfo } from 'react'

export interface IErrorBoundaryProps {
    children: ReactNode
}

export interface IErrorBoundaryState {
    error?: Error
    errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = { error: undefined, errorInfo: undefined }
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
        console.log('caught error ', error, ' with info ', errorInfo)
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="container">
                    <h2>Something went wrong.</h2>
                    <p>Click this from another page otherwise Error Demo will re-trigger</p>
                    <button
                        className="btn btn-info"
                        onClick={() => this.setState({ error: undefined, errorInfo: undefined })}
                    >
                        Clear Error
                    </button>

                    <br />
                    <br />
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
