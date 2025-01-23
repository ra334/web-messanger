import { db } from '@/db/postgress'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import {
    UserData,
    CreateUser,
    GetUser,
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
} from './users-model.d'

// create

async function createUser(data: CreateUser): Promise<UserData> {
    try {
        const newUser = await db.insert(users).values({
            nickName: data.nickName,
            email: data.email,
            password: data.password,
            avatarURL: data.avatarURL,
        }).returning()

        return newUser[0]
    } catch (error) {
        console.error('Creating a user error:', error)
        throw error;
    }
}

// read

async function getUser(data: GetUser): Promise<UserData> {
    try {
        const user = await db.query.users.findFirst({
            where: (eq(users.id, data.id))
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Getting a user error:', error)
        throw error;
    }
}

async function getUserAvatarURL(data: GetUser): Promise<ReturnUserAvatarURL> {
    try {

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

    } catch (error) {
        console.error('Getting a user avatar URL error:', error)
        throw error;
    }
}

async function getUserByEmail() {

}

async function getUserByNickname() {

}

// update

async function updateUserNickname(data: UpdateUserNickname): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({nickName: data.nickName})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user nickname error:', error)
        throw error;
    }
}

async function updateUserEmail(data: UpdateUserEmail): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({email: data.email})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user email error:', error)
        throw error;
    }
}

async function updateUserPassword(data: UpdateUserPassword): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({password: data.password})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user password error:', error)
        throw error;
    }
}

async function updateUserAvatarURL(data: UpdateUserAvatarURL): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({avatarURL: data.avatarURL})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user avatar URL error:', error)
        throw error;
    }
}

async function updateUserStatus(data: UpdateUserStatus): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({status: data.status})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user status error:', error)
        throw error;
    }
}

async function updateUserIsVerified(data: UpdateUserIsVerified): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({isVerified: data.isVerified})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user is_verified error:', error)
        throw error;
    }
}

async function updateUserIsReported(data: UpdateUserIsReported): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({isReported: data.isReported})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user is_reported error:', error)
        throw error;
    }
}

async function updateUserIsActive(data: UpdateUserIsActive): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({isActive: data.isActive})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user is_active error:', error)
        throw error;
    }
}

async function updateUserIsBlocked(data: UpdateUserIsBlocked): Promise<UserData> {
    try {
        const updatedUser = await db
            .update(users)
            .set({isBlocked: data.isBlocked})
            .where(eq(users.id, data.id))
            .returning()

        return updatedUser[0]
    } catch (error) {
        console.error('Updating a user is_blocked error:', error)
        throw error;
    }
}

// delete

async function deleteUser(data: DeleteUser): Promise<UserData> {
    try {
        const deletedUser = await db
            .delete(users)
            .where(eq(users.id, data.id))
            .returning()

        return deletedUser[0]
    } catch (error) {
        console.error('Deleting a user error:', error)
        throw error;
    }
}

export {
    createUser,
    getUser,
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
}