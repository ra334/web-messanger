import UserModel from '../models/user-model'
const hashPass = require('../utils/hash-password')
const { v4: uuidv4 } = require('uuid');
const mailService = require('./mail-service')
const tokenService = require('./token-service')


class UserService {
    async registration(nickname: string, password: string, email: string) {
        const id = uuidv4() // will also be for activation

        const candidate = new UserModel()
    
        // await candidate.searchUserByEmail().then(res => {
        //     if(res) {
        //         console.log('User exist')
        //     } else {
        //         candidate.addUser()
        //         mailService.SendActivationMail(nickname, email, id)
        //         const tokens = tokenService.generateTokens()
        //         console.log('User add')
        //     }
        // })
    }
}


module.exports = new UserService()
