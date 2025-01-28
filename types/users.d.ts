interface UserData {
    id: string;
    nickName: string;
    email: string;
    password: string | null;
    avatarURL: string;
    status: 'offline' | 'online' | 'away';
    isVerified: boolean;
    isReported: boolean;
    isActive: boolean;
    isBlocked: boolean;
    createdAT: Date;
}

interface CreateUser {
    nickName: string;
    email: string;
    password: string | null;
    avatarURL: string;
}

interface LoginUser {
    nickName: string
    email: string
    password: string
}

interface GetUser {
    id: string;
}

interface GetUserByEmail {
    email: string;
}

interface GetUserByNickname {
    nickName: string;
}

interface ReturnUserAvatarURL {
    avatarURL: string;
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
    GetUserByEmail,
    GetUserByNickname,
    ReturnUserAvatarURL,
    UpdateUserNickname,
    UpdateUserEmail,
    UpdateUserPassword,
    UpdateUserAvatarURL,
    UpdateUserStatus,
    UpdateUserIsVerified,
    UpdateUserIsReported,
    UpdateUserIsActive,
    UpdateUserIsBlocked,
    DeleteUser,
    LoginUser
}