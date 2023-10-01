import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const fs = require("fs");

class UserModel {
    async createUser(
        id: string = "",
        nickname: string = "",
        password: string = "",
        email: string = "",
    ) {
        try {
            await prisma.$connect();
            const user = await prisma.users.create({
                data: {
                    id,
                    nickname,
                    password,
                    email,
                    profile_picture: Buffer.from(
                        fs.readFileSync("assets/user-logo.png"),
                    ),
                },
            });
            return user;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateRole(role: string, user_id: string) {
        try {
            await prisma.$connect();
            const updateUser = await prisma.users.update({
                where: { id: user_id },
                data: { role },
            });
            return updateUser;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateLastLogin(last_login: object, user_id: string) {
        try {
            await prisma.$connect();
            const updateUser = await prisma.users.update({
                where: { id: user_id },
                data: { last_login },
            });
            return updateUser;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateStatus(accountStatus: string, userID: string) {
        try {
            await prisma.$connect();
            const updateUser = await prisma.users.update({
                where: { id: userID },
                data: { account_status: accountStatus },
            });
            return updateUser;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateProfilePicture(profilePicture: string, userID: string) {
        try {
            await prisma.$connect();
            const userUdate = await prisma.users.update({
                where: { id: userID },
                data: {
                    profile_picture: Buffer.from(
                        fs.readFileSync(profilePicture),
                    ),
                },
            });
            return userUdate;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateIsActivated(is_activated: boolean, user_id: string) {
        try {
            await prisma.$connect();
            const userUpdate = await prisma.users.update({
                where: { id: user_id },
                data: { is_activated },
            });
            return userUpdate;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async searchUserByEmail(email: string) {
        try {
            await prisma.$connect();
            const searchEmail = await prisma.users.findUnique({
                where: { email },
            });
            return searchEmail;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async searchUserByNickname(nickname: string) {
        try {
            await prisma.$connect();
            const searchUser = await prisma.users.findUnique({
                where: { nickname },
            });
            return searchUser;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteUserByID(userID: string) {
        try {
            await prisma.$connect();

            const deleteUser = await prisma.users.delete({
                where: { id: userID },
            });

            return deleteUser
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new UserModel()