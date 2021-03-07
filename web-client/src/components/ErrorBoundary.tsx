import { Component, ReactNode, ErrorInfo } from 'react'
import Modal from 'react-modal'
import UiContext from '../stores/UiContext'
export interface IErrorBoundaryProps {
    children: ReactNode
}

export interface IErrorBoundaryState {
    error?: Error
    errorInfo?: ErrorInfo
    isErrorModalOpen: boolean
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    static contextType = UiContext

    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = { error: undefined, errorInfo: undefined, isErrorModalOpen: false }
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
        this.context.dispatch({
            type: 'TOAST',
            payload: {
                content: 'Error boundary caught error',
                options: { type: 'error' },
            },
        })
        console.log('Error boundary caught error ', error, ' with info ', errorInfo)
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="container">
                    <h2>Something went wrong.</h2>
                    <p>
                        The error boundary is shown on all routes. Navigate elsewhere from the navbar above then click{' '}
                        <span
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                textDecoration: 'underline',
                                fontSize: '1.5rem',
                            }}
                            onClick={() => this.setState({ error: undefined, errorInfo: undefined })}
                        >
                            Clear Error
                        </span>
                        &nbsp;otherwise you'll re-trigger the error (by being on the current route)
                    </p>

                    <br />
                    <br />
                    <button className="btn btn-info" onClick={() => this.setState({ isErrorModalOpen: true })}>
                        Show error details
                    </button>

                    <Modal
                        isOpen={this.state.isErrorModalOpen}
                        onAfterOpen={() => {}}
                        onRequestClose={() => this.setState({ isErrorModalOpen: false })}
                        style={{}}
                        contentLabel="Content Label"
                        appElement={document.querySelector('#root')!}
                    >
                        <div style={{ display: 'flex' }}>
                            <h2>My Modal</h2>
                            <button
                                className="btn btn-info"
                                style={{ marginLeft: 'auto' }}
                                onClick={() => this.setState({ isErrorModalOpen: false })}
                            >
                                <i className="fa fa-times" />
                                &nbsp;Close
                            </button>
                        </div>
                        <div>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </pre>
                        </div>
                    </Modal>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
