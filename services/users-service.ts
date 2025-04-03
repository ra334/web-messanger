import { z } from 'zod'
import usersModel from '@/db/models/users-model'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import {
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
} from '@/types/users'

const idSchema = z.object({
    id: z.string().uuid()
})

const emailSchema = z.object({
    email: z.string().email().max(255)
})

const nickNameSchema = z.object({
    nickName: z.string().max(50)
})

const passwordSchema = z.object({
    password: z.string().min(8)
})

const imageSchema = z.object({
    image: z.string().max(255)
})

const registerUserSchema = z.object({
    ...nickNameSchema.shape,
    ...emailSchema.shape,
    password: z.string().min(8).nullable(),
})

const loginWithCredentialsSchema = z.object({
    nickName: z.string().max(50).nullable(),
    email: z.string().email().max(255).nullable(),
    ...passwordSchema.shape
})

const updateUserNicknameSchema = z.object({
    ...idSchema.shape,
    ...nickNameSchema.shape
})

const updateUserEmailSchema = z.object({
    ...idSchema.shape,
    ...emailSchema.shape
})

const updateUserPasswordSchema = z.object({
    ...idSchema.shape,
    ...passwordSchema.shape
})

const updateUserImageSchema = z.object({
    ...idSchema.shape,
    ...imageSchema.shape
})

const updateUserStatusSchema = z.object({
    ...idSchema.shape,
    status: z.enum(['offline', 'online', 'away'])
})

const updateUserIsReportedSchema = z.object({
    ...idSchema.shape,
    isReported: z.boolean()
})

const updateUserIsActiveSchema = z.object({
    ...idSchema.shape,
    isActive: z.boolean()
})

const updateUserIsBlockedSchema = z.object({
    ...idSchema.shape,
    isBlocked: z.boolean()
})

class UsersService {
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }

    async registerUser({nickName, email, password}: CreateUser): Promise<UserData> {
        try {
            const saltRounds = Number(process.env.SALT_ROUNDS)
            const parseData = await registerUserSchema.parseAsync({
                nickName,
                email,
                password,
            })

            if (!password) {
                throw new Error("Password is required");
            }
        
            const passwordHah = password
                ? await bcrypt.hash(password, saltRounds)
                : null

            return await usersModel.createUser({
                ...parseData,
                password: passwordHah
            })

        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async login(data: LoginUser) {
        try {
            const parseData = loginWithCredentialsSchema.parse(data)
            let user: UserData | null = null
        
            if (parseData.nickName) {
                user = await usersModel.getUserByNickname({nickName: parseData.nickName})
            } else if (parseData.email) {
                user = await usersModel.getUserByEmail({email: parseData.email})
            }

            if (!user) {
                throw new Error('User not found')
            }

            if (user.password === null) {
                throw new Error('User has no password')
            }

            const isPasswordValid = await bcrypt.compare(parseData.password, user.password)

            if (!isPasswordValid) {
                throw new Error('Invalid password')
            }

            return user
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async loginWithOauth() {

    }

    async getUser(data: GetUser): Promise<UserData> {
        try {
            const parseData = idSchema.parse(data)
            return await usersModel.getUser(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async getUserImage(data: GetUser): Promise<ReturnUserImage> {
        try {
            const parseData = idSchema.parse(data)
            return await usersModel.getUserImage(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async getUserByEmail(data: GetUserByEmail): Promise<UserData> {
        try {
            const parseData = emailSchema.parse(data)
            return await usersModel.getUserByEmail(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async getUserByNickname(data: GetUserByNickname): Promise<UserData> {
        try {
            const parseData = nickNameSchema.parse(data)
            return await usersModel.getUserByNickname(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserNickname(data: UpdateUserNickname): Promise<UserData> {
        try {
            const parseData = updateUserNicknameSchema.parse(data)
            return await usersModel.updateUserNickname(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserEmail(data: UpdateUserEmail): Promise<UserData> {
        try {
            const parseData = updateUserEmailSchema.parse(data)
            return await usersModel.updateUserEmail(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserPassword(data: UpdateUserPassword): Promise<UserData> {
        try {
            const saltRounds = Number(process.env.SALT_ROUNDS)
            const parseData = updateUserPasswordSchema.parse(data)
            const passwordHah = await bcrypt.hash(data.password, saltRounds)

            return await usersModel.updateUserPassword({
                id: parseData.id,
                password: passwordHah
            })
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserAvatarURL(data: UpdateUserImage): Promise<UserData> {
        try {
            const parseData = updateUserImageSchema.parse(data)
            return await usersModel.updateUserAvatarURL(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserStatus(data: UpdateUserStatus): Promise<UserData> {
        try {
            const parseData = updateUserStatusSchema.parse(data)
            return await usersModel.updateUserStatus(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserIsReported(data: UpdateUserIsReported): Promise<UserData> {
        try {
            const parseData = updateUserIsReportedSchema.parse(data)
            return await usersModel.updateUserIsReported(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserIsActive(data: UpdateUserIsActive): Promise<UserData> {
        try {
            const parseData = updateUserIsActiveSchema.parse(data)
            return await usersModel.updateUserIsActive(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateUserIsBlocked(data: UpdateUserIsBlocked): Promise<UserData> {
        try {
            const parseData = updateUserIsBlockedSchema.parse(data)
            return await usersModel.updateUserIsBlocked(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async deleteUser(data: DeleteUser): Promise<UserData> {
        try {
            const parseData = idSchema.parse(data)
            return await usersModel.deleteUser(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }
}

export default new UsersService()