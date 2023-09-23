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
            console.log(e);
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteToken(user_id: string, token_id: string) {
        try {
            await prisma.$connect();
            const deleteToken = await prisma.tokens.delete({
                where: {
                    id: token_id,
                    user_id: user_id,
                },
            });
            return deleteToken;
        } catch (e) {
            console.log(e);
        } finally {
            await prisma.$disconnect();
        }
    }

    async searchTokensByUserID(user_id: string) {
        try {
            await prisma.$connect();
            const searchTokens = prisma.tokens.findMany({
                where: { user_id },
            });
            return searchTokens;
        } catch (e) {
            console.log(e);
        } finally {
            await prisma.$disconnect();
        }
    }

    async searchTokenByUserID(user_id: string) {
        try {
            await prisma.$connect();
            const searchToken = prisma.tokens.findMany({
                where: { user_id },
            });
            return searchToken;
        } catch (e) {
            console.log(e);
        } finally {
            await prisma.$disconnect();
        }
    }

    async searchTokenByID(token_id: string) {
        try {
            await prisma.$connect();
            const searchToken = prisma.tokens.findMany({
                where: { id: token_id },
            });
            return searchToken;
        } catch (e) {
            console.log(e);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new TokenModel();
