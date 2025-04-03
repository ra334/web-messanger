interface UserData {
    id: string;
    nickName: string | null;
    name: string | null;
    email: string;
    password: string | null;
    image: string | null;
    status: 'offline' | 'online' | 'away' | null;
    emailVerified: Date | null;
    isReported: boolean | null;
    isActive: boolean | null;
    isBlocked: boolean | null;
    createdAT: Date | null;
}

interface CreateUser {
    nickName: string;
    email: string;
    password: string | null;
}

interface LoginUser {
    nickName: string | null
    email: string | null
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

interface ReturnUserImage {
    image: string | null;
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

interface UpdateUserImage {
    id: string;
    image: string;
}

interface UpdateUserStatus {
    id: string;
    status: "offline" | "online" | "away";
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
    ReturnUserImage,
    UpdateUserNickname,
    UpdateUserEmail,
    UpdateUserPassword,
    UpdateUserImage,
    UpdateUserStatus,
    UpdateUserIsReported,
    UpdateUserIsActive,
    UpdateUserIsBlocked,
    DeleteUser,
    LoginUser
}