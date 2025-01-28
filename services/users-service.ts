import usersModel from '@/db/models/users-model'

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
} from '@/types/users'

import 'dotenv/config'
import bcrypt from 'bcrypt'

interface LoginUser {
    nickName: string
    email: string
    password: string
}


class UsersService {
    #nickNameValidation(nickname: string) {
        if (!nickname) {
            throw new Error('Nickname is required')
        }
    
        if (nickname.length > 50) {
            throw new Error('Nickname is too long')
        }
    
        return true
    }
    
    #emailValidation(email: string) {
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
    
    #passwordValidation(password: string) {
        if (!password) {
            throw new Error('Password is required')
        }
    
        if (password.length < 8) {
            throw new Error('Password is too short')
        }
    
        return true
    }
    
    #avatarURLValidation(avatarURL: string) {
        if (!avatarURL) {
            throw new Error('Avatar URL is required')
        }
    
        if (avatarURL.length > 255) {
            throw new Error('Avatar URL is too long')
        }
    
        return true
    }
    
    async registerUser(data: CreateUser): Promise<UserData> {
        let user: UserData
        const saltRounds = Number(process.env.SALT_ROUNDS)
    
        this.#nickNameValidation(data.nickName)
        this.#emailValidation(data.email)
        this.#avatarURLValidation(data.avatarURL)
    
        if (data.password) {
            this.#passwordValidation(data.password)
            const hashedPassword = await bcrypt.hash(data.password, saltRounds)
            user = await usersModel.createUser({
                nickName: data.nickName,
                email: data.email,
                password: hashedPassword,
                avatarURL: data.avatarURL
            })

            return user
        }
    
        user = await usersModel.createUser({
            nickName: data.nickName,
            email: data.email,
            password: '',
            avatarURL: data.avatarURL
        })
    
        return user
    }
    
    async loginUser(data: LoginUser): Promise<UserData> {
        let user: UserData
        let comparePassword = false
    
        if (data.nickName) {
            this.#nickNameValidation(data.nickName)
            user = await usersModel.getUserByNickname({nickName: data.nickName})
        } else {
            this.#emailValidation(data.email)
            user = await usersModel.getUserByEmail({email: data.email})
        }
    
        if (!user.password) {
            throw new Error("User doesn't have a password")
        }

        comparePassword = await bcrypt.compare(data.password, user.password)

        if (!comparePassword) {
            throw new Error('Invalid password')
        }

        return user
    }

    async getUser(data: GetUser): Promise<UserData> {
        const user = await usersModel.getUser(data)

        return user
    }

    async getUserAvatarURL(data: GetUser): Promise<ReturnUserAvatarURL> {
        const avatarURL = await usersModel.getUserAvatarURL(data)

        return avatarURL
    }

    async getUserByEmail(data: GetUserByEmail): Promise<UserData> {
        const user = await usersModel.getUserByEmail(data)

        return user
    }

    async getUserByNickname(data: GetUserByNickname): Promise<UserData> {
        const user = await usersModel.getUserByNickname(data)

        return user
    }

    async updateUserNickname(data: UpdateUserNickname): Promise<UserData> {
        const user = await usersModel.updateUserNickname(data)

        return user
    }

    async updateUserEmail(data: UpdateUserEmail): Promise<UserData> {
        const user = await usersModel.updateUserEmail(data)

        return user
    }

    async updateUserPassword(data: UpdateUserPassword): Promise<UserData> {
        const user = await usersModel.updateUserPassword(data)

        return user
    }

    async updateUserAvatarURL(data: UpdateUserAvatarURL): Promise<UserData> {
        const user = await usersModel.updateUserAvatarURL(data)

        return user
    }

    async updateUserStatus(data: UpdateUserStatus): Promise<UserData> {
        const user = await usersModel.updateUserStatus(data)

        return user
    }

    async updateUserIsVerified(data: UpdateUserIsVerified): Promise<UserData> {
        const user = await usersModel.updateUserIsVerified(data)

        return user
    }

    async updateUserIsReported(data: UpdateUserIsReported): Promise<UserData> {
        const user = await usersModel.updateUserIsReported(data)

        return user
    }

    async updateUserIsActive(data: UpdateUserIsActive): Promise<UserData> {
        const user = await usersModel.updateUserIsActive(data)

        return user
    }

    async updateUserIsBlocked(data: UpdateUserIsBlocked): Promise<UserData> {
        const user = await usersModel.updateUserIsBlocked(data)

        return user
    }

    async deleteUser(data: DeleteUser): Promise<UserData> {
        const user = await usersModel.deleteUser(data)

        return user
    }
}

export default new UsersService()