const createTokenModelClient =  require('../utils/create-client')


class TokenModel {
    userID: string
    refreshToken: string

    constructor(
        userID = '',
        refreshToken = '',
    ) {
        this.userID = userID,
        this.refreshToken = refreshToken
    }


    async createTable() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            await client.query(`
            CREATE TABLE RefreshTokens (
                id UUID PRIMARY KEY NOT NULL,
                user_id UUID NOT NULL,
                token TEXT NOT NULL,
                expiration TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (token)
            );
            `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async deleteTable() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            await client.query(`
            DROP TABLE RefreshTokens
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async addToken() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            await client.query(`
            INSERT INTO RefreshTokens (id, user_id, token, expiration) 
            VALUES (UUID_GENERATE_V4(), '${this.userID}', '${this.refreshToken}', NOW() + INTERVAL '7 DAY');
            `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async searchTokenByUserID() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            const result = await client.query(`
                SELECT id
                FROM RefreshTokens
                WHERE token = '${this.refreshToken}'
            `)
            if(result.rows.length > 0) {
                return result.rows
            } else {
                return false
            }
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async deleteRefreshToken() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            await client.query(`
                DELETE FROM RefreshTokens
                WHERE token = '${this.refreshToken}';
            `)
        } catch (e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async getCreateTime() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            const result = await client.query(`
                SELECT created_at
                FROM RefreshTokens
                WHERE user_id = '${this.userID}'
            `)

            if(result) {
                return result.rows[0].created_at
            } else {
                return false
            }

        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async getExpiration() {
        const client = createTokenModelClient()
        try {
            await client.connect()
            const result = await client.query(`
                SELECT expiration
                FROM RefreshTokens
                WHERE user_id = '${this.userID}'
            `)

            if(result) {
                return result.rows[0].expiration
            } else {
                return false
            }

        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }
    
}


export default TokenModel