const Router = require('express').Router
const userController = require('../controllers/user-controller')
const messangerController = require('../controllers/messanger-controller')

const router = new Router()



router.post('/login', (req: any, res: any) => {
    userController.login(req, res)
})

router.post('/registration', (req: any, res: any) => {
    userController.registration(req, res)
})

router.post('/logout', (req: any, res: any) => {
    userController.logout(req, res)
})

router.get('/activate/:link', (req: any, res: any) => {
    userController.activate(req, res)
})

router.get('/refresh', (req: any, res: any) => {
    userController.refresh(req, res)
})

router.get('/user', (req: any, res: any) => {
    userController.getUser(req, res)
})

router.get('/chats', (req: any, res: any) => {
    messangerController.getChats(req, res)
})

router.get('/messages', (req: any, res:any) => {
    messangerController.getMessages(req, res)
})


module.exports = router