import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary" role="alert">
                    <div className="error-boundary-content">
                        <h2>{this.props.title || 'Something went wrong'}</h2>
                        <p>{this.props.message || 'An unexpected error occurred. Please try again.'}</p>
                        {this.props.showRetry && (
                            <button
                                className="option-button fade-in"
                                onClick={this.handleRetry}
                            >
                                {this.props.retryLabel || 'Try Again'}
                            </button>
                        )}
                        {this.state.error && (
                            <details className="error-details">
                                <summary>Error Details</summary>
                                <pre>{this.state.error.toString()}</pre>
                                {this.state.errorInfo && (
                                    <pre>{this.state.errorInfo.componentStack}</pre>
                                )}
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    title: PropTypes.string,
    message: PropTypes.string,
    showRetry: PropTypes.bool,
    retryLabel: PropTypes.string,
    onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
    showRetry: true,
};

export default ErrorBoundary;
