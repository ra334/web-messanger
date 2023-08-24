const bcrypt = require('bcrypt')
const saltRounds = 7


function hashPass(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}


module.exports = hashPass