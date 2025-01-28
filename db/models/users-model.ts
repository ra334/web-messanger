import { db } from '@/db/postgress'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import type {
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

class UsersModel {

    // create

    async createUser(data: CreateUser): Promise<UserData> {
        try {
            const newUser = await db.insert(users).values({
                nickName: data.nickName,
                email: data.email,
                password: data.password,
                avatarURL: data.avatarURL,
            }).returning()

            return newUser[0]
        } catch (error: any) {
            
            if (error.message == 'duplicate key value violates unique constraint "users_email_unique"') {
                throw new Error('User already exists with this email');
            } else if (error.message == 'duplicate key value violates unique constraint "users_nick_name_unique"') {
                throw new Error('User already exists with this nickname');
            }

            throw error;
        }
    }

    // read

    async getUser(data: GetUser): Promise<UserData> {
        const user = await db.query.users.findFirst({
            where: (eq(users.id, data.id))
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async getUserAvatarURL(data: GetUser): Promise<ReturnUserAvatarURL> {
        const avatarURL = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, data.id),
            columns: {
                avatarURL: true
            }
        })

        if (!avatarURL) {
            throw new Error('User not found');
        }

        return avatarURL
    }

    async getUserByEmail(data: GetUserByEmail): Promise<UserData> {
        const user = await db.query.users.findFirst({
            where: (eq(users.email, data.email))
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async getUserByNickname(data: GetUserByNickname): Promise<UserData> {
        const user = await db.query.users.findFirst({
            where: (eq(users.nickName, data.nickName))
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user
    }

    // update

    async updateUserNickname(data: UpdateUserNickname): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({nickName: data.nickName})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserEmail(data: UpdateUserEmail): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({email: data.email})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserPassword(data: UpdateUserPassword): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({password: data.password})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserAvatarURL(data: UpdateUserAvatarURL): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({avatarURL: data.avatarURL})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserStatus(data: UpdateUserStatus): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({status: data.status})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserIsVerified(data: UpdateUserIsVerified): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({isVerified: data.isVerified})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserIsReported(data: UpdateUserIsReported): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({isReported: data.isReported})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserIsActive(data: UpdateUserIsActive): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({isActive: data.isActive})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    async updateUserIsBlocked(data: UpdateUserIsBlocked): Promise<UserData> {
        const updatedUser = await db
            .update(users)
            .set({isBlocked: data.isBlocked})
            .where(eq(users.id, data.id))
            .returning()

        if (!updatedUser[0]) {
            throw new Error('User not found');
        }

        return updatedUser[0]
    }

    // delete

    async deleteUser(data: DeleteUser): Promise<UserData> {
        const deletedUser = await db
            .delete(users)
            .where(eq(users.id, data.id))
            .returning()

        if (!deletedUser[0]) {
            throw new Error('User not found');
        }

        return deletedUser[0]
    }
}

export default new UsersModel()