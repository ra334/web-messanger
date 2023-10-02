import userModel from "../models/user-model";
import tokenModel from "../models/token-model";
import tokenService from "./token-service";
import ApiError from "../error/api-error";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import hashPassword from "../utils/hash-password";

class UserService {
    async registration(nickname: string, password: string, email: string) {
        if (!validator.isEmail(email)) {
            throw ApiError.BadRequest("Incorrect email");
        }

        const isEmailExist = await userModel.getUserByEmail(email);

        if (isEmailExist) {
            throw ApiError.BadRequest("Email is already exist");
        }

        const userID = uuidv4();
        const tokens = tokenService.generateTokens({
            userID,
            nickname,
            email,
        });
        await userModel.createUser(
            userID,
            nickname,
            hashPassword(password),
            email,
        );

        await tokenService.registerToken(userID, tokens.refreshToken);

        return tokens;
    }

    async login(nicknameOrEmail: string, password: string, refreshToken: any) {
        let user;

        if (validator.isEmail(nicknameOrEmail)) {
            // email
            user = await userModel.getUserByEmail(nicknameOrEmail);
        } else {
            // nickname
            user = await userModel.getUserByNickname(nicknameOrEmail);
        }

        if (!user) {
            throw ApiError.BadRequest("User doesn't exist");
        }

        if (user.password !== hashPassword(password)) {
            throw ApiError.BadRequest("Incorrect password");
        }

        if (!refreshToken) {
            return tokenService.loginToken(user.id, false, {
                userID: user.id,
                nickname: user.nickname,
                email: user.email,
            });
        } else {
            return tokenService.loginToken(user.id, refreshToken, {
                userID: user.id,
                nickname: user.nickname,
                email: user.email,
            });
        }
    }
}

export default new UserService();