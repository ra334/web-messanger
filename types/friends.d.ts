interface Friend {
    id: string;
    userID: string;
    friendID: string;
    firstName: string;
    createdAt: Date;
}

interface CreateFriend {
    userID: string;
    friendID: string;
    firstName: string;
}

interface GetFriend {
    id: string;
}

interface GetFriends {
    userID: string;
}

interface UpdateFriendName {
    id: string;
    firstName: string;
}

interface DeleteFriend {
    id: string;
}

export {
    Friend,
    CreateFriend,
    GetFriend,
    GetFriends,
    UpdateFriendName,
    DeleteFriend
}