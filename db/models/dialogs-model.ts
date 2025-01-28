import { db } from '@/db/postgress'
import { dialogs } from '@/db/schema/dialogs'
import { eq } from 'drizzle-orm'
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

class DialogsModel {
    // create

    async createDialog(data: CreateDialog): Promise<Dialog> {
        try {
            const dialog = await db.insert(dialogs).values({
                senderID: data.senderID,
                receiverID: data.receiverID,
                lastMessage: data.lastMessage
            }).returning()

            return dialog[0]
        } catch (error) {
            console.error('Creating dialog error:', error)
            throw error
        }
    }

    // read

    async getDialog(data: GetDialog): Promise<Dialog> {
        try {
            const dialog = await db.query.dialogs.findFirst({
                where: (eq(dialogs.id, data.id))
            })

            if (!dialog) {
                throw new Error('Dialog not found')
            }

            return dialog
        } catch (error) {
            console.error('Getting dialog error:', error)
            throw error
        }
    }

    async getDialogs(data: GetDialogs): Promise<Dialog[]> {
        try {
            const dialogFromUserID = await db.query.dialogs.findMany({
                where: (
                    eq(dialogs.senderID, data.userID),
                    eq(dialogs.receiverID, data.userID)
                ),
            })

            return dialogFromUserID
        } catch (error) {
            console.error('Getting dialogs error:', error)
            throw error
        }
    }

    // update

    async updateIsDeletedForSender(data: UpdateIsDeletedForSender): Promise<Dialog> {
        try {
            const dialog = await db
                .update(dialogs)
                .set({
                    isDeletedForSender: data.value
                })
                .where(eq(dialogs.id, data.id))
                .returning()

            return dialog[0]
        } catch (error) {
            console.error('Updating isDeletedForSender error:', error)
            throw error
        }
    }

    async updateIsDeletedForReceiver(data: UpdateIsDeletedForReceiver): Promise<Dialog> {
        try {
            const dialog = await db
                .update(dialogs)
                .set({
                    isDeletedForReceiver: data.value
                })
                .where(eq(dialogs.id, data.id))
                .returning()

            return dialog[0]
        } catch (error) {
            console.error('Updating isDeletedForReceiver error:', error)
            throw error
        }
    }

    async updateLastMessage(data: UpdateLastMessage): Promise<Dialog> {
        try {
            const dialog = await db
                .update(dialogs)
                .set({
                    lastMessage: data.lastMessage
                })
                .where(eq(dialogs.id, data.id))
                .returning()

            return dialog[0]
        } catch (error) {
            console.error('Updating lastMessage error:', error)
            throw error
        }
    }

    // delete

    async deleteDialog(data: DeleteDialog): Promise<Dialog> {
        try {
            const dialog = await db
                .delete(dialogs)
                .where(eq(dialogs.id, data.id))
                .returning()

            return dialog[0]
        } catch (error) {
            console.error('Deleting dialog error:', error)
            throw error
        }
    }
}

export default new DialogsModel()