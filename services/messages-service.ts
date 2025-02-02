import { z } from 'zod'
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


const idSchema = z.object({
    id: z.string().uuid()
})

const dialogIDSchema = z.object({
    dialogID: z.string().uuid()
})

const createMessageSchema = z.object({
    dialogID: z.string().uuid().nullable(),
    groupID: z.string().uuid().nullable(),
    senderID: z.string().uuid(),
    messageType: z.enum(['text', 'media']),
    mediaID: z.string().nullable(),
    text: z.string().nullable()
})

const getMessageFromUser = z.object({
    userID: z.string().uuid(),
    ...dialogIDSchema.shape
})

const updateMessageTextSchema = z.object({
    ...idSchema.shape,
    text: z.string()
})

const updateMessageIsEditedSchema = z.object({
    ...idSchema.shape,
    isEdited: z.boolean()
})

const updateMessageIsReadedSchema = z.object({
    ...idSchema.shape,
    isReaded: z.boolean()
})


class MessagesService {
    
    async sendMessage(data: CreateMessage): Promise<Message> {
        try {
            const parseData = createMessageSchema.parse(data)
            return await messagesModel.createMessage(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getMessage(data: GetMessage): Promise<Message> {
        try {
            const parseData = idSchema.parse(data)
            return await messagesModel.getMessage(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getMessagesFromDialog(data: GetMessagesFromDialog): Promise<Message[]> {
        try {
            const parseData = dialogIDSchema.parse(data)
            return await messagesModel.getMessagesFromDialog(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getMessagesFromUser(data: GetMessagesFromUser): Promise<Message[]> {
        try {
            const parseData = getMessageFromUser.parse(data)
            return await messagesModel.getMessagesFromUser(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async updateMessageText(data: UpdateMessageText): Promise<Message> {
        try {
            const parseData = updateMessageTextSchema.parse(data)
            return await messagesModel.updateMessageText(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async updateMessageIsEdited(data: UpdateMessageIsEdited): Promise<Message> {
        try {
            const parseData = updateMessageIsEditedSchema.parse(data)
            return await messagesModel.updateMessageIsEdited(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async updateMessageIsReaded(data: UpdateMessageIsReaded): Promise<Message> {
        try {
            const parseData = updateMessageIsReadedSchema.parse(data)
            return await messagesModel.updateMessageIsReaded(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async deleteMessage(data: DeleteMessage): Promise<Message> {
        try {
            const parseData = idSchema.parse(data)
            return await messagesModel.deleteMessage(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }
}

export default new MessagesService()