import messagesModel from "@/db/models/messages-model";
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

class MessagesService {
    
    async sendMessage(data: CreateMessage): Promise<Message> {
        const message = await messagesModel.createMessage(data)

        return message
    }

    async getMessage(data: GetMessage): Promise<Message> {
        const message = await messagesModel.getMessage(data)

        return message
    }

    async getMessagesFromDialog(data: GetMessagesFromDialog): Promise<Message[]> {
        const messages = await messagesModel.getMessagesFromDialog(data)

        return messages
    }

    async getMessagesFromUser(data: GetMessagesFromUser): Promise<Message[]> {
        const messages = await messagesModel.getMessagesFromUser(data)

        return messages
    }

    async updateMessageText(data: UpdateMessageText): Promise<Message> {
        const message = await messagesModel.updateMessageText(data)

        return message
    }

    async updateMessageIsEdited(data: UpdateMessageIsEdited): Promise<Message> {
        const message = await messagesModel.updateMessageIsEdited(data)

        return message
    }

    async updateMessageIsReaded(data: UpdateMessageIsReaded): Promise<Message> {
        const message = await messagesModel.updateMessageIsReaded(data)

        return message
    }

    async deleteMessage(data: DeleteMessage): Promise<Message> {
        const message = await messagesModel.deleteMessage(data)

        return message
    }
}

export default new MessagesService()