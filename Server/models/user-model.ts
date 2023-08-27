const createUserModelClient =  require('../utils/create-client')
const fs = require('fs')


class UserModel {
    id: string
    nickname: string
    password: string
    email: string
    role: string
    lastLogin: object
    accountStatus: string
    profilePicture: object
    isActivated: boolean

    constructor({
        id = '',
        nickname = '',
        password = '',
        email = '',
        role = 'User',
        lastLogin = new Date(),
        accountStatus = 'Active',
        profilePicture = fs.readFileSync('assets/user-logo.png'),
        isActivated = false,
    }) {
        this.id = id
        this.nickname = nickname
        this.password = password
        this.email = email
        this.role = role
        this.lastLogin = lastLogin
        this.accountStatus = accountStatus
        this.profilePicture = profilePicture  // buffer photo
        this.isActivated = isActivated
    }


    async createTable() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            CREATE TABLE Users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                nickname VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                role VARCHAR(50),
                last_login TIMESTAMP,
                account_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                account_status VARCHAR(50) DEFAULT 'Active' CHECK (account_status IN ('Active', 'Blocked', 'Deleted')),
                profile_picture BYTEA,
                is_activated BOOLEAN NOT NULL
            );
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async deleteTable() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            DROP TABLE Users
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async addUser() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            INSERT INTO Users (id, nickname, password, email, role, last_login, account_created, account_status, profile_picture, is_activated)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), $8, $9, $10);
        `, [
            this.id,
            this.nickname, 
            this.password, 
            this.email, 
            this.role, 
            this.lastLogin, 
            this.accountStatus, 
            this.profilePicture,
            this.isActivated,
        ]);
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateNickname() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET nickname = '${this.nickname}'
            WHERE id = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updatePassword() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET password = ${this.password}
            WHERE id = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateRole() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET role = ${this.role}
            WHERE id = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateLastLogin() {
        const client = createUserModelClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET last_login = ${this.lastLogin}
            WHERE id = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateAccountStatus() {
        const client = createUserModelClient()
        try{
            await client.connect()
            await client.query(`
            UPDATE Users
            SET account_status = ${this.accountStatus}
            WHERE id = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateProfilePicture() {
        const client = createUserModelClient()
        try{
            await client.connect()
            await client.query(`
            UPDATE Users
            SET profile_picture = ${this.profilePicture}
            WHERE id = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async searchUserByEmail() {
        const client = createUserModelClient()
        try {
            await client.connect()
            const result = await client.query(`SELECT 1 FROM Users WHERE email = '${this.email}'`)
            return result.rows.length > 0
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }  
    }

    async getUserIdByEmail() {
        const client = createUserModelClient()
        try {
            await  client.connect()
            const result = await client.query(`
                SELECT id
                FROM Users
                WHERE email = '${this.email}'
            `)

            if(result.rows.length > 0) {
                return result.rows
            } else {
                return false
            }
            
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async deleteUserByID() {
        const client = createUserModelClient()
        try {
            await  client.connect()
            await client.query(`
                DELETE FROM Users
                WHERE id = '${this.id}'
            `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }
}


export default UserModel