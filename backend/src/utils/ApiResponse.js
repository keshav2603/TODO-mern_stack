class ApiResponse{
    /**
     * @param {number} statusCode - The HTTP status code.
     * @param {any} data - The data to be included in the response.
     * @param {string} [message="success"] - The response message.
     */
    
    constructor( statusCode, data, message = "success" ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode>400;
    }
}
export {ApiResponse};