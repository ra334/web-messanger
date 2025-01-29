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

class DialogsService {
    async createDialog(data: CreateDialog): Promise<Dialog> {
        if (data.senderID === data.receiverID) {
            throw new Error('You cannot create dialog with yourself')
        }

        if (!data.lastMessage) {
            throw new Error('Last message is required')
        }

        const dialog = await dialogsModel.createDialog(data)

        return dialog
    }

    async getDialog(data: GetDialog): Promise<Dialog> {
        const dialog = await dialogsModel.getDialog(data)

        return dialog
    }

    async getDialogsByUser(data: GetDialogs): Promise<Dialog[]> {
        const dialogs = await dialogsModel.getDialogsByUser(data)

        return dialogs
    }

    async updateIsDeletedForSender(data: UpdateIsDeletedForSender): Promise<Dialog> {
        const dialog = await dialogsModel.updateIsDeletedForSender(data)

        return dialog
    }

    async updateIsDeletedForReceiver(data: UpdateIsDeletedForReceiver): Promise<Dialog> {
        const dialog = await dialogsModel.updateIsDeletedForReceiver(data)

        return dialog
    }

    async updateLastMessage(data: UpdateLastMessage): Promise<Dialog> {
        const dialog = await dialogsModel.updateLastMessage(data)

        return dialog
    }

    async deleteDialog(data: DeleteDialog): Promise<Dialog> {
        const dialog = await dialogsModel.deleteDialog(data)

        return dialog
    }
}

export default new DialogsService()