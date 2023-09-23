import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class MessageModel {
    async createMessage(
        chat_id: string,
        sender_id: string,
        message_text: string,
    ) {
        try {
            await prisma.$connect()
            const createdMessage = await prisma.messages.create({
                data: {
                    chat_id,
                    sender_id,
                    message_text
                }
            })

            return createdMessage
        } catch(e) {
            console.log(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}

export default new MessageModel();
