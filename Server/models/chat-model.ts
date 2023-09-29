import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ChatModel {
    async createChat(chatName: string) {
        try {
            await prisma.$connect();
            const chat = await prisma.chats.create({
                data: {
                    chat_name: chatName,
                },
            });

            return chat;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getChatID(chatName: string) {
        try {
            await prisma.$connect();
            const chat = await prisma.chats.findFirst({
                where: {
                    chat_name: chatName,
                },
            });

            if (chat) {
                return chat.id;
            }

            return chat;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async getChatName(chatID: string) {
        try {
            await prisma.$connect();
            const chat = await prisma.chats.findFirst({
                where: {
                    id: chatID,
                },
            });

            if (chat) {
                return chat.chat_name;
            }

            return chat;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async updateChatName(chatID: string, chatName: string) {
        try {
            await prisma.$connect();
            const chat = await prisma.chats.update({
                where: {
                    id: chatID,
                },
                data: {
                    chat_name: chatName,
                },
            });

            return chat;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async deleteChatByID(chatID: string) {
        try {
            await prisma.$connect();
            const chat = await prisma.chats.delete({
                where: {
                    id: chatID,
                },
            });

            return chat;
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new ChatModel();
