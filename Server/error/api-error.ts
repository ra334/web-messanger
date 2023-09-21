class ApiError extends Error {
    status: number;
    errors: any;

    constructor(status: number, message: string, errors: any) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "User doesn't login", []);
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors)
    }
}

export default ApiError