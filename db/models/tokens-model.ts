import { db } from '@/db/postgress'
import { tokens } from '@/db/schema/tokens'
import { eq } from 'drizzle-orm'
import type {
    Token,
    CreateToken,
    GetToken,
    GetUserTokens,
    DeleteToken
} from '@/types/tokens'

class TokensModel {
    // create

    async createToken(data: CreateToken): Promise<Token> {
        const token = await db.insert(tokens).values({
            userID: data.userID,
            token: data.token,
            expiresAt: data.expiresAt
        }).returning()

        return token[0]
    }

    // read
    
    async getToken(data: GetToken): Promise<Token> {
        const token = await db.query.tokens.findFirst({
            where: (eq(tokens.id, data.id))
        })

        if (!token) {
            throw new Error('Token not found')
        }

        return token
    }

    async getUserTokens(data: GetUserTokens): Promise<Token[]> {
        const userTokens = await db.query.tokens.findMany({
            where: (eq(tokens.userID, data.userID))
        })

        if (!userTokens) {
            throw new Error('User tokens not found')
        }

        return userTokens
    }
    
    // update
    
    
    
    // delete

    async deleteToken(data: DeleteToken): Promise<Token> {
        const token = await db
            .delete(tokens)
            .where(eq(tokens.id, data.id))
            .returning()

        return token[0]
    }
}

export default new TokensModel()