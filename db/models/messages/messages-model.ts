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
} from './messages'

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

        } catch (error) {
            console.error('Creating a message error:', error)
            throw error;
        }

    }

    // read

    async getMessage(data: GetMessage): Promise<Message> {
        try {
            const message = await db.query.messages.findFirst({
                where: (eq(messages.id, data.id))
            })

            if (!message) {
                throw new Error('Message not found')
            }

            return message
        } catch (error) {
            console.error('Getting a message error:', error)
            throw error;
        }
    }

    async getMessagesFromDialog(data: GetMessagesFromDialog) {
        try {
            const messagesFromDialog = db.query.messages.findMany({
                where: (eq(messages.dialogID, data.dialogID))
            })

            return messagesFromDialog
        } catch (error) {
            console.error('Getting messages from dialog error:', error)
            throw error;
        }
    }

    async getMessagesFromUser(data: GetMessagesFromUser) {
        try {
            const messagesFromUser = db.query.messages.findMany({
                where: (eq(messages.senderID, data.userID))
            })

            return messagesFromUser
        } catch (error) {
            console.error('Getting messages from user error:', error)
            throw error;
        }
    }


    // update

    async updateMessageText(data: UpdateMessageText) {
        try {
            const message = await db
                .update(messages)
                .set({
                    text: data.text
                })
                .where(eq(messages.id, data.id))

            return message

        } catch (error) {
            console.error('Updating message text error:', error)
            throw error;
        }   
    }

    async updateMessageIsEdited(data: UpdateMessageIsEdited) {
        try {
            const message = await db
                .update(messages)
                .set({
                    is_edited: data.isEdited
                })
                .where(eq(messages.id, data.id))

            return message
        } catch (error) {
            console.error('Updating message is_edited error:', error)
            throw error;
        }
    }

    async updateMessageIsReaded(data: UpdateMessageIsReaded) {
        try {
            const messageIsReaded = await db
                .update(messages)
                .set({
                    is_readed: data.isReaded
                })
                .where(eq(messages.id, data.id))
        } catch (error) {
            console.error('Updating message is_readed error:', error)
            throw error;
        }
    }

    // delete

    async deleteMessage(data: DeleteMessage) {
        try {
            const deletedMessage = await db
                .delete(messages)
                .where(eq(messages.id, data.id))

            return deletedMessage
        } catch (error) {
            console.error('Deleting message error:', error)
            throw error;
        }
    }
}

export default new MessagesModel()