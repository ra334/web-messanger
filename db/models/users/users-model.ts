import { db } from '@/db/postgress'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import {
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
    UpdateUserUpdateAt,
    DeleteUser
} from './users'

// create

async function createUser(data: CreateUser): Promise<UserData> {
    try {
        const newUser = await db.insert(users).values({
            firstName: data.firstName,
            lastName: data.lastName,
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

async function getUser(data: GetUser): Promise<ReturnUser> {
    try {
        const user = await db.query.users.findFirst({
            where: (eq(users.id, data.id)),
            columns: {
                id: true,
                firstName: true,
                lastName: true,
                nickName: true,
                email: true,
                avatarURL: true,
            }
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

async function getUserFirstName(data: GetUser): Promise<ReturnUserFirstName> {
    try {

        const firstName = await db.query.users.findFirst({
            where: (eq(users.id, data.id)),
            columns: {
                firstName: true
            }
        })

        if (!firstName) {
            throw new Error('User not found');
        }

        return firstName

    } catch (error) {
        console.error('Getting a user first name error:', error)
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

// update

async function updateUserFirstName(data: UpdateUserFirstName)  {
    try {
        const updatedUser = await db
            .update(users)
            .set({firstName: data.firstName})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user first name error:', error)
        throw error;
    }
}

async function updateUserLastName(data: UpdateUserLastName) {
    try {
        const updatedUser = await db
            .update(users)
            .set({lastName: data.lastName})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user last name error:', error)
        throw error;
    }
}

async function updateUserNickname(data: UpdateUserNickname) {
    try {
        const updatedUser = await db
            .update(users)
            .set({nickName: data.nickName})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user nickname error:', error)
        throw error;
    }
}

async function updateUserEmail(data: UpdateUserEmail) {
    try {
        const updatedUser = await db
            .update(users)
            .set({email: data.email})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user email error:', error)
        throw error;
    }
}

async function updateUserPassword(data: UpdateUserPassword) {
    try {
        const updatedUser = await db
            .update(users)
            .set({password: data.password})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user password error:', error)
        throw error;
    }
}

async function updateUserAvatarURL(data: UpdateUserAvatarURL) {
    try {
        const updatedUser = await db
            .update(users)
            .set({avatarURL: data.avatarURL})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user avatar URL error:', error)
        throw error;
    }
}

async function updateUserStatus(data: UpdateUserStatus) {
    try {
        const updatedUser = await db
            .update(users)
            .set({status: data.status})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user status error:', error)
        throw error;
    }
}

async function updateUserIsVerified(data: UpdateUserIsVerified) {
    try {
        const updatedUser = await db
            .update(users)
            .set({isVerified: data.isVerified})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user is_verified error:', error)
        throw error;
    }
}

async function updateUserIsReported(data: UpdateUserIsReported) {
    try {
        const updatedUser = await db
            .update(users)
            .set({isReported: data.isReported})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user is_reported error:', error)
        throw error;
    }
}

async function updateUserIsActive(data: UpdateUserIsActive) {
    try {
        const updatedUser = await db
            .update(users)
            .set({isActive: data.isActive})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user is_active error:', error)
        throw error;
    }
}

async function updateUserIsBlocked(data: UpdateUserIsBlocked) {
    try {
        const updatedUser = await db
            .update(users)
            .set({isBlocked: data.isBlocked})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user is_blocked error:', error)
        throw error;
    }
}

async function updateUserUpdatedAt(data: UpdateUserUpdateAt) {
    try {
        const updatedUser = await db
            .update(users)
            .set({updatedAT: new Date()})
            .where(eq(users.id, data.id))

        return updatedUser
    } catch (error) {
        console.error('Updating a user updated_at error:', error)
        throw error;
    }
}

// delete

async function deleteUser(data: DeleteUser) {
    try {
        const deletedUser = await db
            .delete(users)
            .where(eq(users.id, data.id))

        return deletedUser
    } catch (error) {
        console.error('Deleting a user error:', error)
        throw error;
    }
}

export {
    createUser,
    getUser,
    getUserFirstName,
    getUserAvatarURL,
    updateUserFirstName,
    updateUserLastName,
    updateUserNickname,
    updateUserEmail,
    updateUserPassword,
    updateUserAvatarURL,
    updateUserStatus,
    updateUserIsVerified,
    updateUserIsReported,
    updateUserIsActive,
    updateUserIsBlocked,
    updateUserUpdatedAt,
    deleteUser
}