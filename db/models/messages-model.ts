import { db } from '@/db/postgress'
import { messages } from '@/db/schema/messages'
import { eq } from 'drizzle-orm'
import type {
    Message,
    CreateMessage,
    GetMessage,
    GetMessagesFromDialog,
    GetMessagesFromUser,
    UpdateMessageText,
    UpdateMessageIsEdited,
    UpdateMessageIsReaded,
    DeleteMessage
} from '@/types/messages'

class MessagesModel {
    // create

    async createMessage(data: CreateMessage): Promise<Message> {
        try {
            const newMessage = await db.insert(messages).values({
                dialogID: data.dialogID,
                senderID: data.senderID,
                messageType: data.messageType,
                mediaID: data.mediaID,
                text: data.text
            }).returning()

            return newMessage[0]

        } catch (error: any) {

            const senderError = 'insert or update on table "messages" violates foreign key constraint "messages_sender_id_users_id_fk"'
            const dialogError = 'insert or update on table "messages" violates foreign key constraint "messages_dialog_id_dialogs_id_fk"'

            if (error.message == dialogError) {
                throw new Error('Dialog not found')
            } else if (error.message == senderError) {
                throw new Error('Sender not found')
            }

            throw error;
        }

    }

    // read

    async getMessage(data: GetMessage): Promise<Message> {
        const message = await db.query.messages.findFirst({
            where: (eq(messages.id, data.id))
        })

        if (!message) {
            throw new Error('Message not found')
        }

        return message
    }

    async getMessagesFromDialog(data: GetMessagesFromDialog): Promise<Message[]> {
        const messagesFromDialog = await db.query.messages.findMany({
            where: (eq(messages.dialogID, data.dialogID))
        })

        if (!messagesFromDialog.length) {
            throw new Error('Messages not found')
        }

        return messagesFromDialog
    }

    async getMessagesFromUser(data: GetMessagesFromUser): Promise<Message[]> {
        const messagesFromUser = await db.query.messages.findMany({
            where: (eq(messages.senderID, data.userID))
        })

        if (!messagesFromUser.length) {
            throw new Error('Messages not found')
        }

        return messagesFromUser
    }


    // update

    async updateMessageText(data: UpdateMessageText): Promise<Message> {
        const message = await db
            .update(messages)
            .set({
                text: data.text
            })
            .where(eq(messages.id, data.id))
            .returning()

        if (!message.length) {
            throw new Error('Message not found')
        }

        return message[0] 
    }

    async updateMessageIsEdited(data: UpdateMessageIsEdited): Promise<Message> {
        const message = await db
            .update(messages)
            .set({
                is_edited: data.isEdited
            })
            .where(eq(messages.id, data.id))
            .returning()

        if (!message.length) {
            throw new Error('Message not found')
        }

        return message[0]
    }

    async updateMessageIsReaded(data: UpdateMessageIsReaded): Promise<Message> {
        const messageIsReaded = await db
            .update(messages)
            .set({
                is_readed: data.isReaded
            })
            .where(eq(messages.id, data.id))
            .returning()

        if (!messageIsReaded.length) {
            throw new Error('Message not found')
        }

        return messageIsReaded[0]
    }

    // delete

    async deleteMessage(data: DeleteMessage): Promise<Message> {
        const deletedMessage = await db
            .delete(messages)
            .where(eq(messages.id, data.id))
            .returning()

        if (!deletedMessage.length) {
            throw new Error('Message not found')
        }

        return deletedMessage[0]
    }
}

export default new MessagesModel()