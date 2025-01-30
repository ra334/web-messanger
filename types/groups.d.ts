interface Group {
    id: string;
    creatorID: string;
    name: string;
    description: string | null;
    avatarURL: string;
    membersCount: number;
    createdAt: Date;
}

interface CreateGroup {
    creatorID: string;
    name: string;
    avatarURL: string;
}

interface GetGroup {
    id: string;
}

interface GetGroupFromUser {
    creatorID: string;
}

interface UpdateCreatorID {
    id: string;
    creatorID: string;
}
interface UpdateGroupName {
    id: string;
    name: string;
}

interface UpdateGroupDescription {
    id: string;
    description: string;
}

interface UpdateGroupAvatarURL {
    id: string;
    avatarURL: string;
}

interface UpdateGroupMemberCount {
    id: string;
    memberCount: number;
}

interface DeleteGroup {
    id: string;
}

export {
    Group,
    CreateGroup,
    GetGroup,
    GetGroupFromUser,
    UpdateCreatorID,
    UpdateGroupName,
    UpdateGroupDescription,
    UpdateGroupAvatarURL,
    UpdateGroupMemberCount,
    DeleteGroup
}