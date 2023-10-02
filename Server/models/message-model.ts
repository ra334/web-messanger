import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class MessageModel {
    async createMessage(senderID: string, messageText: string) {
        try {
            await prisma.$connect();
            const createdMessage = await prisma.messages.create({
                data: {
                    sender_id: senderID,
                    message_text: messageText,
                },
            });

            return createdMessage;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getMessage(senderID: string, messageText: string) {
        try {
            await prisma.$connect();
            const message = await prisma.messages.findFirst({
                where: {
                    sender_id: senderID,
                    message_text: messageText,
                },
            });

            return message;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getMessages(senderID: string) {
        try {
            await prisma.$connect();
            const messages = await prisma.messages.findMany({
                where: {
                    sender_id: senderID,
                },
            });

            return messages;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateMessage(messageID: string, messageText: string) {
        try {
            await prisma.$connect();
            const message = await prisma.messages.update({
                where: {
                    id: messageID,
                },
                data: {
                    message_text: messageText,
                    is_updated: true,
                },
            });

            return message;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteMessage(messageID: string) {
        try {
            await prisma.$connect();
            const message = await prisma.messages.delete({
                where: {
                    id: messageID,
                },
            });

            return message;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteMessages(senderID: string) {
        try {
            await prisma.$connect();
            const messages = await prisma.messages.deleteMany({
                where: {
                    sender_id: senderID,
                },
            });

            return messages;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new MessageModel();
