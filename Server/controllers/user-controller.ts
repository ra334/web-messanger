import { Request, Response, NextFunction } from "express";
const userService = require("../service/user-service");

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { nickname, password, email } = req.body;
            const userData = await userService.registration(
                nickname,
                password,
                email
            );
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (e) {
            next(e);
        }
    }

    getUsers(
        req: Request,
        res: { json: (arg0: string[]) => void },
        next: NextFunction
    ) {
        try {
            res.json(["122", "1213"]);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
