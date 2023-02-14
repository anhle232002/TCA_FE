import React, { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    error: any;
    resetErrorBoundary: any;
}
function ErrorFallback({ error, resetErrorBoundary }: Props) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

const CustomErrorBoundary = ({ children }: ErrorBoundaryProps) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            {children}
        </ErrorBoundary>
    );
};

export default CustomErrorBoundary;
