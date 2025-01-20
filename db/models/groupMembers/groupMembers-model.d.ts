interface GroupMembers {
    id: string;
    groupID: string;
    userID: string;
    isAdmin: boolean;
    joinedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface CreateGroupMember {
    groupID: string;
    userID: string;
}

interface GetGroupMember {
    id: string;
}

interface GetGroupMembers {
    groupID: string;
}

interface UpdateGroupIsAdmin {
    id: string;
    isAdmin: boolean;
}

interface DeleteGroupMember {
    id: string;
}

export {
    GroupMembers,
    CreateGroupMember,
    GetGroupMember,
    GetGroupMembers,
    UpdateGroupIsAdmin,
    DeleteGroupMember
}