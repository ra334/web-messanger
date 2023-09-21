import userModel from "../models/user-model";
const hashPass = require("../utils/hash-password");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const tokenService = require("./token-service");
const tokenModel = require("../models/token-model");
import ApiError from '../error/api-error'

class UserService {
    async registration(nickname: string, password: string, email: string) {
        if (!validator.isEmail(email)) {
            throw ApiError.BadRequest("Incorrect email");
        }

        const isEmailExist = await userModel.searchUserByEmail(email);

        if (isEmailExist) {
            throw ApiError.BadRequest("Email is already exist");
        }

        const userID = uuidv4();
        const tokens = tokenService.generateTokens({
            userID,
            nickname,
            email,
        });
        await userModel.createUser(userID, nickname, hashPass(password), email);

        await tokenService.registerToken(userID, tokens.refreshToken);

        return tokens;
    }

    async login(nicknameOrEmail: string, password: string) {
        let user;

        if (validator.isEmail(nicknameOrEmail)) {
            // email
            user = await userModel.searchUserByEmail(nicknameOrEmail);
        } else {
            // nickname
            user = await userModel.searchUserByNickname(nicknameOrEmail);
        }

        if (!user) {
            throw ApiError.BadRequest("User doesn't exist");
        }

        if (user.password !== hashPass(password)) {
            throw ApiError.BadRequest("Incorrect password");
        }

        const tokens = await tokenModel.searchTokenByUserID(user.id);

        return tokenService.loginToken(user.id, tokens[0].id, {
            userID: user.id,
            nickname: user.nickname,
            email: user.email,
        });
    }
}

module.exports = new UserService();
