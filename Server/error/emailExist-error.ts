class EmailExist extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Email alreade exist";
    }
}

export default EmailExist;