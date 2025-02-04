import { z } from 'zod'
import dialogsModel from "@/db/models/dialogs-model";
import type {
    Dialog,
    CreateDialog,
    GetDialog,
    GetDialogs,
    UpdateIsDeletedForSender,
    UpdateIsDeletedForReceiver,
    UpdateLastMessage,
    DeleteDialog
} from '@/types/dialogs'

const idSchema = z.object({
    id: z.string().uuid()
})

const createDialogSchema = z.object({
    senderID: z.string().uuid(),
    receiverID: z.string().uuid(),
    lastMessage: z.string().min(1, 'Last message is required')
}).refine(data => data.senderID !== data.receiverID, {
    message: 'You cannot create dialog with yourself',
    path: ['receiverID', 'senderID']
})

const getDialogsByUserSchema = z.object({
    userID: z.string().uuid()
})

const updateIsDeletedForSenderSchema = z.object({
    ...idSchema.shape,
    value: z.boolean()
})

const updateIsDeletedForReceiverSchema = z.object({
    ...idSchema.shape,
    value: z.boolean()
})

const updateLastMessageSchema = z.object({
    ...idSchema.shape,
    lastMessage: z.string().min(1, 'Last message is required')
})

class DialogsService {
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }

    async createDialog(data: CreateDialog): Promise<Dialog> {
        try {
            const parseData = createDialogSchema.parse(data)
            return await dialogsModel.createDialog(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getDialog(data: GetDialog): Promise<Dialog> {
        try {
            const parseData = idSchema.parse(data)
            return await dialogsModel.getDialog(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getDialogsByUser(data: GetDialogs): Promise<Dialog[]> {
        try {
            const parseData = getDialogsByUserSchema.parse(data)
            return await dialogsModel.getDialogsByUser(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateIsDeletedForSender(data: UpdateIsDeletedForSender): Promise<Dialog> {
        try {
            const parseData = updateIsDeletedForSenderSchema.parse(data)
            return await dialogsModel.updateIsDeletedForSender(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateIsDeletedForReceiver(data: UpdateIsDeletedForReceiver): Promise<Dialog> {
        try {
            const parseData = updateIsDeletedForReceiverSchema.parse(data)
            return await dialogsModel.updateIsDeletedForReceiver(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateLastMessage(data: UpdateLastMessage): Promise<Dialog> {
        try {
            const parseData = updateLastMessageSchema.parse(data)
            return await dialogsModel.updateLastMessage(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async deleteDialog(data: DeleteDialog): Promise<Dialog> {
        try {
            const parseData = idSchema.parse(data)
            return await dialogsModel.deleteDialog(parseData)

        } catch (error: any) {
            this.handleValidationError(error)
        }
    }
}

export default new DialogsService()