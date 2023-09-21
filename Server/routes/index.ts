const Router = require('express').Router
const userController = require('../controllers/user-controller')
const messangerController = require('../controllers/messanger-controller')
import { Request, Response, NextFunction } from "express";

const router = new Router()


router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next)
})

router.post('/registration', (req: Request, res: Response, next: any) => {
    userController.registration(req, res, next)
})

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    userController.logout(req, res, next)
})

router.get('/refresh', (req: Request, res: Response, next: NextFunction) => {
    userController.refresh(req, res, next)
})

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
    userController.getUsers(req, res, next)
})

router.get('/chats', (req: Request, res: Response, next: NextFunction) => {
    messangerController.getChats(req, res, next)
})

router.get('/messages', (req: Request, res:Response, next: NextFunction) => {
    messangerController.getMessages(req, res, next)
})


module.exports = router