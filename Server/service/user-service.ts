import userModel from "../models/user-model";
const hashPass = require("../utils/hash-password");
const mailService = require("./mail-service");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const tokenService = require("./token-service");
const tokenModel = require("../models/token-model");

class UserService {
    async registration(nickname: string, password: string, email: string) {
        if (validator.isEmail(email)) {
            const userID = uuidv4();
            const tokens = tokenService.generateTokens({
                userID,
                nickname,
                email,
            });
            await userModel.createUser(userID, nickname, hashPass(password), email);

            await tokenService.registerToken(userID, tokens.refreshToken);

            return tokens;
        } else {
            return false;
        }
    }

    async login(nicknameOrEmail: string, password: string) {
        if (validator.isEmail(nicknameOrEmail)) {
            // email
            const user = await userModel.searchUserByEmail(nicknameOrEmail);
            if (user?.password === "pass") {
                const tokens = await tokenModel.searchTokenByUserID(user.id)
                return tokenService.loginToken(user.id, tokens[0].id, {
                    userID: user.id,
                    nickname: user.nickname,
                    email: user.email,
                    
                });
            }
        } else {
            // nickname
            const user = await userModel.searchUserByNickname(nicknameOrEmail);
            if (user?.password === "pass") {
                const tokens = await tokenModel.searchTokenByUserID(user.id)
                tokenService.loginToken(user.id, tokens[0].id, {
                    userID: user.id,
                    nickname: user.nickname,
                    email: user.email,
                });
            }
        }
    }
}

module.exports = new UserService();

const userService = new UserService();

userService.registration('bobrik33', 'pidoras', 'pidoras@gmail.com')
    .then((res: any) => {
        console.log(res)
    })