import { Component, ReactNode, ErrorInfo } from 'react'
import Modal from 'react-modal'
import UiContext from '../stores/UiContext'

Modal.setAppElement('#root')

export interface IErrorBoundaryProps {
    //children: ReactNode
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
                    <p>This error boundary is currently placed to overlay all routes.</p>
                    <p>To return to normal, you will need to:</p>
                    <ul>
                        <li>
                            Use the navbar to navigate to any route other than <code>Error Demo</code> (i.e. use Home)
                        </li>
                        <li>
                            Click this{' '}
                            <button
                                className="btn btn-primary"
                                onClick={() => this.setState({ error: undefined, errorInfo: undefined })}
                            >
                                Clear Error
                            </button>
                        </li>
                    </ul>

                    <br />
                    <br />
                    <p>
                        You can view details about the error here
                        <button className="btn btn-info" onClick={() => this.setState({ isErrorModalOpen: true })}>
                            Show error details
                        </button>
                    </p>

                    <Modal
                        isOpen={this.state.isErrorModalOpen}
                        onAfterOpen={() => {}}
                        onRequestClose={() => this.setState({ isErrorModalOpen: false })}
                        style={{}}
                        contentLabel="Content Label"
                    >
                        <div style={{ display: 'flex' }}>
                            <h2>My Modal</h2>
                            <button
                                className="btn btn-info"
                                style={{ marginLeft: 'auto' }}
                                onClick={() => this.setState({ isErrorModalOpen: false })}
                            >
                                <i className="bi bi-x-lg" />
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
