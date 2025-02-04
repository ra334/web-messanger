import { z } from 'zod'
import userVerification from '@/db/models/userVerifications-model'
import {
    UsesrVerification,
    CreateUserVerification,
    GetUserVerification,
    UpdateUserVerification,
    UpdateIsUsed,
    DeleteUserVerification
} from '@/types/userVerificatons'

const userIDSchema = z.object({
    userID: z.string().uuid()
})

const verificationCodeSchema = z.object({
    ...userIDSchema.shape,
    verificationCode: z.string().length(6)
})

const updateISUsedSchema = z.object({
    ...userIDSchema.shape,
    isUsed: z.boolean()
})

class UserVerificaionsService {
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }
    
    async getUserVerification(data: GetUserVerification): Promise<UsesrVerification> {
        try {
            const parseData = verificationCodeSchema.parse(data)
            return await userVerification.getUserVerification(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async updateIsUsed(data: UpdateIsUsed): Promise<UsesrVerification> {
        try {
            const parseData = updateISUsedSchema.parse(data)
            return await userVerification.updateIsUsed(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async deleteUserVerification(data: DeleteUserVerification): Promise<UsesrVerification> {
        try {
            const parseData = userIDSchema.parse(data)
            return await userVerification.deleteUserVerification(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }
    

    // TODO send email
    async createUserVerification(data: CreateUserVerification): Promise<UsesrVerification> {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

        const verification = await userVerification.createUserVerification(data)

        return verification
    }

    async validateVerificationCode(userID: string, code: string) {
        const verification = await this.getUserVerification({userID})

        if (verification.isUsed) {
            throw new Error('Verification code is already used')
        }

        if (verification.verificationCode !== code) {
            throw new Error('Invalid verification code')
        }

        await this.updateIsUsed({userID, isUsed: true})

        return verification
    }

    async updateUserVerificationCode(data: UpdateUserVerification): Promise<UsesrVerification> {
        try {
            const parseData = verificationCodeSchema.parse(data)
            return await userVerification.updateVerificationCode(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }
}

export default new UserVerificaionsService()