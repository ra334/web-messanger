import { db } from '@/db/postgress'
import { userVerifications } from '@/db/schema/usersVerification'
import { eq } from 'drizzle-orm'
import {
    UsesrVerification,
    CreateUserVerification,
    GetUserVerification,
    UpdateUserVerification,
    UpdateIsUsed,
    DeleteUserVerification
} from './usersVerificatons'

// create

async function createUserVerification(data: CreateUserVerification): Promise<UsesrVerification> {
    try {
        const userVerification = await db.insert(userVerifications).values({
            userID: data.userID,
            verificationCode: data.verificationCode
        }).returning()

        return userVerification[0]

    } catch (error) {
        console.error('Creating userverification error:', error)
        throw error;
    }
}

// read

async function getUserVerification(data: GetUserVerification): Promise<UsesrVerification> {
    try {
        const userVerification = await db.query.userVerifications.findFirst({
            where: (eq(userVerifications.userID, data.userID))
        })

        if (!userVerification) {
            throw new Error('User verification not found')
        }

        return userVerification

    } catch (error) {
        console.error('Getting userverification error:', error)
        throw error;
    }
}

// update

async function updateVerificationCode(data: UpdateUserVerification) {
    try {
        const userVerification = await db
            .update(userVerifications)
            .set({
                verificationCode: data.verificationCode
            })
            .where(eq(userVerifications.userID, data.userID))

        return userVerification

    } catch (error) {
        console.error('Updating userverification code error:', error)
        throw error;
    }
}

async function updateIsUsed(data: UpdateIsUsed) {
    try {
        const userVerification = await db
            .update(userVerifications)
            .set({
                isUsed: data.isUsed
            })
            .where(eq(userVerifications.userID, data.userID))

        return userVerification

    } catch (error) {
        console.error('Updating userverification isUsed error:', error)
        throw error;
    }
}

// delete

async function deleteUserVerification(data: DeleteUserVerification) {
    try {
        const userVerification = await db
            .delete(userVerifications)
            .where(eq(userVerifications.userID, data.userID))

        return userVerification

    } catch (error) {
        console.error('Deleting userverification error:', error)
        throw error;
    }
}

export {
    createUserVerification,
    getUserVerification,
    updateVerificationCode,
    updateIsUsed,
    deleteUserVerification
}