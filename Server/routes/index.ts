const Router = require('express').Router


const router = new Router()

router.post('/login')
router.post('/registration')
router.post('/logout')
router.get('/activate/:link')
router.get('/refresh')
router.get('/chats')
router.get('/messages')


module.exports = router