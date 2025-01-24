import {
    createUser,
    getUser,
    getUserByEmail,
    getUserByNickname,
    getUserAvatarURL,
    updateUserNickname,
    updateUserEmail,
    updateUserPassword,
    updateUserAvatarURL,
    updateUserStatus,
    updateUserIsVerified,
    updateUserIsReported,
    updateUserIsActive,
    updateUserIsBlocked,
    deleteUser
} from '@/db/models/users/users-model'

import {
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
    DeleteUser
} from '@/db/models/users/users-model.d'

import { LoginUser } from './users-service.d'

import 'dotenv/config'
import bcrypt from 'bcrypt'


function nickNameValidation(nickname: string) {
    if (!nickname) {
        throw new Error('Nickname is required')
    }

    if (nickname.length > 50) {
        throw new Error('Nickname is too long')
    }

    return true
}

function emailValidation(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (!email) {
        throw new Error('Email is required')
    }

    if (!emailRegex.test(email)) {
        throw new Error('Invalid email')
    }

    if (email.length > 255) {
        throw new Error('Email is too long')
    }

    return true
}

function passwordValidation(password: string) {
    if (!password) {
        throw new Error('Password is required')
    }

    if (password.length < 8) {
        throw new Error('Password is too short')
    }

    return true
}

function avatarURLValidation(avatarURL: string) {
    if (!avatarURL) {
        throw new Error('Avatar URL is required')
    }

    if (avatarURL.length > 255) {
        throw new Error('Avatar URL is too long')
    }

    return true
}

async function registerUser(data: CreateUser) {
    const saltRounds = Number(process.env.SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)

    nickNameValidation(data.nickName)
    emailValidation(data.email)
    passwordValidation(data.password)
    avatarURLValidation(data.avatarURL)

    const user = await createUser({
        nickName: data.nickName,
        email: data.email,
        password: hashedPassword,
        avatarURL: data.avatarURL
    })

    return user
}

async function loginUser(data: LoginUser) {
    let user: UserData
    let comparePassword = false

    if (data.nickName) {
        nickNameValidation(data.nickName)
        user = await getUserByNickname({nickName: data.nickName})
    } else {
        emailValidation(data.email)
        user = await getUserByEmail({email: data.email})
    }

    comparePassword = await bcrypt.compare(data.password, user.password)

}

async function forgotPassword(data: GetUserByEmail) {
    emailValidation(data.email)

    const user = await getUserByEmail(data)

}

export {
    registerUser,
    loginUser,
    forgotPassword
}