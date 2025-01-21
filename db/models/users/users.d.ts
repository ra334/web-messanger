interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    password: string;
    avatarURL: string;
    status: 'offline' | 'online' | 'away';
    isVerified: boolean;
    isReported: boolean;
    isActive: boolean;
    isBlocked: boolean;
    createdAT: Date;
}

interface CreateUser {
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    password: string;
    avatarURL: string;
}

interface GetUser {
    id: string;
}

interface ReturnUser {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    avatarURL: string;
}

interface ReturnUserFirstName {
    firstName: string;
}

interface ReturnUserAvatarURL {
    avatarURL: string;
}

interface UpdateUserFirstName {
    id: string;
    firstName: string;
}

interface UpdateUserLastName {
    id: string;
    lastName: string;
}

interface UpdateUserNickname {
    id: string;
    nickName: string;
}

interface UpdateUserEmail {
    id: string;
    email: string;
}

interface UpdateUserPassword {
    id: string;
    password: string;
}

interface UpdateUserAvatarURL {
    id: string;
    avatarURL: string;
}

interface UpdateUserStatus {
    id: string;
    status: "offline" | "online" | "away";
}

interface UpdateUserIsVerified {
    id: string;
    isVerified: boolean;
}

interface UpdateUserIsReported {
    id: string;
    isReported: boolean;
}

interface UpdateUserIsActive {
    id: string;
    isActive: boolean;
}

interface UpdateUserIsBlocked {
    id: string;
    isBlocked: boolean;
}

interface DeleteUser {
    id: string;
}

export {
    UserData,
    CreateUser,
    GetUser,
    ReturnUser,
    ReturnUserFirstName,
    ReturnUserAvatarURL,
    UpdateUserFirstName,
    UpdateUserLastName,
    UpdateUserNickname,
    UpdateUserEmail,
    UpdateUserPassword,
    UpdateUserAvatarURL,
    UpdateUserStatus,
    UpdateUserIsVerified,
    UpdateUserIsReported,
    UpdateUserIsActive,
    UpdateUserIsBlocked,
    DeleteUser
}