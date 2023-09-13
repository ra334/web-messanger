class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "User doesn't exist";
    }
}

export default UserError;
