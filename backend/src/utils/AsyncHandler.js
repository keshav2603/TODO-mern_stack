/**
 * A higher-order function to wrap asynchronous route handlers and catch errors.
 * @param {Function} requestHandler - The asynchronous route handler.
 * @returns {Function} A function that wraps the route handler with error handling.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Ensure the request handler is executed and any errors are caught and passed to next()
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};

export { asyncHandler };
