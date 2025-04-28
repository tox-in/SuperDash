function ErrorAlert({ message }) {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {message}
        </div>
    );
}

export default ErrorAlert;