interface BlockedUser {
    id: string;
    blockedID: string;
    createdAt: Date;
}

interface CreateBlockedUser {
    blockedID: string;
}

interface GetBlockdeUser {
    id: string;
}

interface GetBlockedUsers {
    limit: number;
    offset: number;
}

interface DeleteBlockedUser {
    id: string;
}

export {
    BlockedUser,
    CreateBlockedUser,
    GetBlockdeUser,
    GetBlockedUsers,
    DeleteBlockedUser
}