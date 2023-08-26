import UserModel from '../models/user-model'
const hashPass = require('../utils/hash-password')
const { v4: uuidv4 } = require('uuid');
const mailService = require('./mail-service')

class UserService {
    async registration(nickname: string, password: string, email: string) {
        const id = uuidv4()

        const candidate = new UserModel({
            id: id,
            nickname: nickname,
            password: hashPass(password),
            email: email
        })
    
        candidate.searchUserByEmail().then(res => {
            if(res) {
                console.log('User exist')
            } else {
                candidate.addUser()
                console.log('User add')
            }
        })
    }
}


module.exports = new UserService()
