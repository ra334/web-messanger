import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class MessageModel {
    async createMessage(
        chat_id: string,
        sender_id: string,
        message_text: string,
    ) {
        try {
            await prisma.$connect();
            const createdMessage = await prisma.messages.create({
                data: {
                    chat_id,
                    sender_id,
                    message_text,
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

    async getMessageID(userID: string, messageText: string) {
        try {
            await prisma.$connect();
            const message = await prisma.messages.findFirst({
                where: {
                    sender_id: userID,
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

    async updateMessage(newMessage: string, messageID: string) {
        try {
            await prisma.$connect();
            const updateMessage = await prisma.messages.update({
                where: {
                    id: messageID,
                },
                data: {
                    message_text: newMessage,
                },
            });

            return updateMessage;
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
            const deleteMessage = await prisma.messages.delete({
                where: {
                    id: messageID,
                },
            });

            return deleteMessage;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteAllMessage(chatID: string) {
        try {
            await prisma.$connect();
            const message = await prisma.messages.deleteMany({
                where: {
                    chat_id: chatID,
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
}

export default new MessageModel();
