import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class TokenModel {
    async createToken(user_id: string = "", token: string = "") {
        try {
            await prisma.$connect();

            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 7);

            const createToken = await prisma.tokens.create({
                data: {
                    user_id,
                    token,
                    expiration: currentDate,
                },
            });
            return createToken;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteToken(tokenID: string) {
        try {
            await prisma.$connect();
            const deleteToken = await prisma.tokens.delete({
                where: {
                    id: tokenID
                },
            });
            return deleteToken;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteTokens(userID: string) {
        try {
            await prisma.$connect()
            const tokens = await prisma.tokens.deleteMany({
                where: {
                    user_id: userID
                }
            })

            return tokens
        } catch(e) {
            console.log(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getTokensByUserID(userID: string) {
        try {
            await prisma.$connect();
            const searchTokens = prisma.tokens.findMany({
                where: { user_id: userID },
            });
            return searchTokens;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getTokenByID(tokenID: string) {
        try {
            await prisma.$connect();
            const searchToken = prisma.tokens.findFirst({
                where: { id: tokenID },
            });
            return searchToken;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new TokenModel();
