interface UsesrVerification {
    userID: string;
    verificationCode: string;
    isUsed: boolean;
    createdAt: Date;
}

interface CreateUserVerification {
    userID: string;
    verificationCode: string;
}

interface GetUserVerification {
    userID: string;
}

interface UpdateUserVerification {
    userID: string;
    verificationCode: string;
}

interface UpdateIsUsed {
    userID: string;
    isUsed: boolean;
}

interface DeleteUserVerification {
    userID: string;
}

export {
    UsesrVerification,
    CreateUserVerification,
    GetUserVerification,
    UpdateUserVerification,
    UpdateIsUsed,
    DeleteUserVerification
}