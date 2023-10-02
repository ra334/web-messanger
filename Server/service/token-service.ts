require("dotenv").config();
const jwt = require("jsonwebtoken");
import tokenModel from '../models/token-model'

class TokenService {
    generateTokens(payload: object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
            expiresIn: "7d",
        });

        return { accessToken, refreshToken };
    }

    async registerToken(userID: string, refreshToken: string) {
        await tokenModel.createToken(userID, refreshToken);
    }

    async loginToken(userID: string, token: any, payload: any) {
        let isTokenValid;
        let tokens;

        if (token) {
            isTokenValid = this.verifyRefreshToken(token)
            tokens = await tokenModel.getTokensByUserID(userID)
        } else {
            return this.generateTokens(payload)
        }

        if (isTokenValid) {
            tokens.forEach(async (token) => {
                const isTokenValid = this.verifyRefreshToken(token.token)

                if (!isTokenValid) {
                    await tokenModel.deleteToken(token.id)
                } 
            })

            return this.generateTokens(payload)
        } else {
            return this.generateTokens(payload)
        }
    }

    async refreshToken() {}

    verifyAccessToken(accessToken: string) {
        try {
            jwt.verify(accessToken, process.env.JWT_ACCESS);
            return true;
        } catch (e) {
            return false;
        }
    }

    verifyRefreshToken(refreshToken: string) {
        try {
            jwt.verify(refreshToken, process.env.JWT_REFRESH);
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default new TokenService();