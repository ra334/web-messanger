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
    async createToken(data: CreateToken): Promise<Token> {
        try {
            const parseData = createTokenSchema.parse(data)
            return await tokensModel.createToken(parseData)
        } catch (error) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getToken(data: GetToken): Promise<Token> {
        try {
            const parseData = idSchema.parse(data)
            return await tokensModel.getToken(parseData)
        } catch (error) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getUserTokens(data: GetUserTokens): Promise<Token[]> {
        try {
            const parseData = userIDSchema.parse(data)
            return await tokensModel.getUserTokens(parseData)
        } catch (error) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async deleteToken(data: DeleteToken): Promise<Token> {
        try {
            const parseData = idSchema.parse(data)
            return await tokensModel.deleteToken(parseData)
        } catch (error) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }
}

export default new TokensService()