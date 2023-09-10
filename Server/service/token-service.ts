require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

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

    async loginToken(userID: string, tokenID: string, payload: any) {
        const userToken = await tokenModel.searchTokenByUserID(userID);
        if (userToken) {
            await tokenModel.deleteToken(userID, tokenID);
            const tokens = await this.generateTokens(payload);
            await this.registerToken(payload.userID, tokens.refreshToken);
            return tokens;
        } else if (!userToken) {
            const tokens = await this.generateTokens(payload);
            await this.registerToken(payload.userID, tokens.refreshToken);
            return tokens;
        }
    }

    verifyAccssToken(accessToken: string) {
        try {
            jwt.verify(accessToken, process.env.JWT_REFRESH);
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

module.exports = new TokenService();
