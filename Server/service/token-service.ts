const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token-model')


class TokenService {
    generateTokens(payload: string) {
        const accessToken = jwt.sign(payload, 'jwt@access@@LJ', {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, 'jwt@refresh@)*', {expiresIn: '7d'})

        return {accessToken, refreshToken}
    }

    async saveToken(userID: string, refreshToken: string) {
        const tokenModel = new TokenModel(userID, refreshToken)

        tokenModel.searchTokenByUserID().then((tokenValue: boolean) => {
            tokenModel.getExpiration().then(async (expirationTime: object) => {
                
                if (new Date() >= expirationTime) {
                    await tokenModel.deleteRefreshToken()
                    return false    // the token has expired

                } else if(new Date() <= expirationTime) {
                    return tokenValue  // the token is valid

                } else if (!tokenValue) {
                    await tokenModel.addToken()
                    return tokenValue
                }
            })
        })
    }
}


module.exports = new TokenService()