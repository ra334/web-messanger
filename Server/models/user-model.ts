const createClient =  require('../utils/create-client')
const fs = require('fs')


class UserModel {
    id: string
    nickname: string
    password: string
    email: string
    role: string
    lastLogin: object
    accountCreated: object
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
        accountCreated = new Date(),
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
        this.accountCreated = accountCreated
        this.accountStatus = accountStatus
        this.profilePicture = profilePicture  // buffer photo
        this.isActivated = isActivated
    }


    createTable() {
        const client = createClient()
        try {
            client.connect()
            client.query(`
            CREATE TABLE Users (
                ID uuid NOT NULL,
                Nickname VARCHAR(255) NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                Role VARCHAR(50),
                LastLogin TIMESTAMP,
                AccountCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                AccountStatus VARCHAR(50) DEFAULT 'Active' CHECK (AccountStatus IN ('Active', 'Blocked', 'Deleted')),
                ProfilePicture BYTEA,
                IsActivated BOOLEAN NOT NULL,
                PRIMARY KEY (ID)
            );
        `)
        } catch(e) {
            console.log(e)
        } finally {
            client.end()
        }
    }

    async addUser() {
        const client = createClient()
        try {
            await client.connect()
            await client.query(`
            INSERT INTO Users (ID, Nickname, Password, Email, Role, LastLogin, AccountCreated, AccountStatus, ProfilePicture, IsActivated)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
        `, [
            this.id,
            this.nickname, 
            this.password, 
            this.email, 
            this.role, 
            this.lastLogin, 
            this.accountCreated, 
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

    async deleteTable() {
        const client = createClient()
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

    async updateNickname() {
        const client = createClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET Nickname = '${this.nickname}'
            WHERE ID = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updatePassword() {
        const client = createClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET Nickname = ${this.password}
            WHERE ID = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateRole() {
        const client = createClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET Nickname = ${this.role}
            WHERE ID = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateLastLogin() {
        const client = createClient()
        try {
            await client.connect()
            await client.query(`
            UPDATE Users
            SET Nickname = ${this.lastLogin}
            WHERE ID = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateAccountStatus() {
        const client = createClient()
        try{
            await client.connect()
            await client.query(`
            UPDATE Users
            SET Nickname = ${this.accountStatus}
            WHERE ID = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async updateProfilePicture() {
        const client = createClient()
        try{
            await client.connect()
            await client.query(`
            UPDATE Users
            SET Nickname = ${this.profilePicture}
            WHERE ID = '${this.id}'
        `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }

    async searchUserByEmail() {
        const client = createClient()
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
        const client = createClient()
        try {
            await  client.connect()
            const result = await client.query(`
                SELECT ID
                FROM Users
                WHERE Email = '${this.email}'
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
        const client = createClient()
        try {
            await  client.connect()
            await client.query(`
                DELETE FROM Users
                WHERE ID = '${this.id}'
            `)
        } catch(e) {
            console.log(e)
        } finally {
            await client.end()
        }
    }
}


export default UserModel