interface BlockedUser {
    id: string;
    userID: string;
    createdAt: Date;
}

interface CreateBlockedUser {
    userID: string;
}

interface GetBlockdeUser {
    id: string;
}

interface DeleteBlockedUser {
    id: string;
}

export {
    BlockedUser,
    CreateBlockedUser,
    GetBlockdeUser,
    DeleteBlockedUser
}