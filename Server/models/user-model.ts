const client = require('../utils/database-connect')


class UserModel {
    static createTable: any
    async createTable() {
        const result = await client.query(`
            CREATE TABLE Users (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                Nickname VARCHAR(255) NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                Role VARCHAR(50),
                LastLogin DATETIME,
                AccountCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
                AccountStatus ENUM('Active', 'Blocked', 'Deleted') DEFAULT 'Active',
                ProfilePicture VARCHAR(255)
            );
        `)
        console.log(result)
    }

}

const userModel = UserModel
userModel.createTable()