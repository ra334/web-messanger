import { db } from '@/db/postgress'
import { userVerifications } from '@/db/schema/userVerifications'
import { eq } from 'drizzle-orm'
import type {
    UsesrVerification,
    CreateUserVerification,
    GetUserVerification,
    UpdateUserVerification,
    UpdateIsUsed,
    DeleteUserVerification
} from '@/types/userVerificatons'

// create

class UserVerifivationsModel {
    async createUserVerification(data: CreateUserVerification): Promise<UsesrVerification> {
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
    
    async getUserVerification(data: GetUserVerification): Promise<UsesrVerification> {
        const userVerification = await db.query.userVerifications.findFirst({
            where: (eq(userVerifications.userID, data.userID))
        })

        if (!userVerification) {
            throw new Error('User verification not found')
        }

        return userVerification
    }
    
    // update
    
    async updateVerificationCode(data: UpdateUserVerification): Promise<UsesrVerification> {
        const userVerification = await db
            .update(userVerifications)
            .set({
                verificationCode: data.verificationCode
            })
            .where(eq(userVerifications.userID, data.userID))
            .returning()

        if (!userVerification.length) {
            throw new Error('User verification not found')
        } 

        return userVerification[0]
    }
    
    async updateIsUsed(data: UpdateIsUsed): Promise<UsesrVerification> {
        const userVerification = await db
            .update(userVerifications)
            .set({
                isUsed: data.isUsed
            })
            .where(eq(userVerifications.userID, data.userID))
            .returning()

        if (!userVerification.length) {
            throw new Error('User verification not found')
        }

        return userVerification[0]
    }
    
    // delete
    
    async deleteUserVerification(data: DeleteUserVerification): Promise<UsesrVerification> {
        const userVerification = await db
            .delete(userVerifications)
            .where(eq(userVerifications.userID, data.userID))
            .returning()

        if (!userVerification.length) {
            throw new Error('User verification not found')
        }

        return userVerification[0]
    }
}

export default new UserVerifivationsModel()