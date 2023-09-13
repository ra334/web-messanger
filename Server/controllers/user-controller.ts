const userService = require("../service/user-service");

class UserController {
    async registration(req: any, res: any, next: any) {
        try {
            const { nickname, password, email } = req.body;
            const userData = await userService.registration(
                nickname,
                password,
                email
            );
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async login(req: any, res: any, next: any) {
        try {
        } catch (e) {}
    }

    async logout(req: any, res: any, next: any) {
        try {
        } catch (e) {}
    }

    getUsers(req: any, res: { json: (arg0: string[]) => void }, next: any) {
        try {
            res.json(["122", "1213"]);
        } catch (e) {}
    }

    async refresh(req: any, res: any, next: any) {
        try {
        } catch (e) {}
    }

    async activate(req: any, res: any, next: any) {
        try {
        } catch (e) {}
    }
}

module.exports = new UserController();