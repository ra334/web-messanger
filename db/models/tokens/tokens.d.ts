interface Token {
    id: string;
    userID: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

interface CreateToken {
    userID: string;
    token: string;
    expiresAt: Date;
}

interface GetToken {
    id: string;
}

interface GetUserTokens {
    userID: string;
}

interface DeleteToken {
    id: string;
}

export {
    Token,
    CreateToken,
    GetToken,
    GetUserTokens,
    DeleteToken
}
