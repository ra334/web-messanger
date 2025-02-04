import { z } from 'zod'
import tokensModel from '@/db/models/tokens-model'
import type {
    Token,
    CreateToken,
    GetToken,
    GetUserTokens,
    DeleteToken
} from '@/types/tokens'

const idSchema = z.object({
    id: z.string().uuid()
})

const userIDSchema = z.object({
    userID: z.string().uuid()
})

const createTokenSchema = z.object({
    ...userIDSchema.shape,
    token: z.string(),
    expiresAt: z.date()
})

class TokensService {
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }

    async createToken(data: CreateToken): Promise<Token> {
        try {
            const parseData = createTokenSchema.parse(data)
            return await tokensModel.createToken(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async getToken(data: GetToken): Promise<Token> {
        try {
            const parseData = idSchema.parse(data)
            return await tokensModel.getToken(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async getUserTokens(data: GetUserTokens): Promise<Token[]> {
        try {
            const parseData = userIDSchema.parse(data)
            return await tokensModel.getUserTokens(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }

    async deleteToken(data: DeleteToken): Promise<Token> {
        try {
            const parseData = idSchema.parse(data)
            return await tokensModel.deleteToken(parseData)
        } catch (error) {
            this.handleValidationError(error)
        }
    }
}

export default new TokensService()