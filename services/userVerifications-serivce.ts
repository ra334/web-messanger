import userVerification from '@/db/models/userVerifications/userVerifications-model'
import {
    UsesrVerification,
    CreateUserVerification,
    GetUserVerification,
    UpdateUserVerification,
    UpdateIsUsed,
    DeleteUserVerification
} from '@/db/models/userVerifications/userVerificatons'

class UserVerificaionsService {
    async #getUserVerification(data: GetUserVerification): Promise<UsesrVerification> {
        const verification = await userVerification.getUserVerification(data)

        return verification
    }

    async #updateIsUsed(data: UpdateIsUsed): Promise<UsesrVerification> {
        const verification = await userVerification.updateIsUsed(data)

        return verification
    }

    async #deleteUserVerification(data: DeleteUserVerification): Promise<UsesrVerification> {
        const verification = await userVerification.deleteUserVerification(data)

        return verification

    }
    

    // TODO send email
    async createUserVerification(userID: string) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

        const verification = await userVerification.createUserVerification({userID, verificationCode})

        return verification
    }

    async validateVerificationCode(userID: string, code: string) {
        const verification = await this.#getUserVerification({userID})

        if (verification.isUsed) {
            throw new Error('Verification code is already used')
        }

        if (verification.verificationCode !== code) {
            throw new Error('Invalid verification code')
        }

        this.#updateIsUsed({userID, isUsed: true})

        return verification
    }

    async updateUserVerificationCode(userID: string, code: string) {
        const verification = await userVerification.updateVerificationCode({userID, verificationCode: code})

        return verification
    }
}

export default new UserVerificaionsService()