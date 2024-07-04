class ApiError extends Error{
    /**
     * @param {number} statusCode - The HTTP status code.
     * @param {string} [message="something went wrong!!"] - The error message.
     * @param {Array} [errors=[]] - Additional error details.
     * @param {string} [stack=""] - The stack trace.
     */
    constructor(
        statusCode,
        message ="something went wrong!!",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError };