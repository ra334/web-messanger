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
        } catch (error: any) {
            
            const senderError = 'insert or update on table "dialogs" violates foreign key constraint "dialogs_sended_user_id_users_id_fk"'
            const receiverError = 'insert or update on table "dialogs" violates foreign key constraint "dialogs_received_user_id_users_id_fk"'

            if (error.message === senderError) {
                throw new Error('Sender not found')
            } else if (error.message === receiverError) {
                throw new Error('Receiver not found')
            }
            
            throw error
        }
    }

    // read

    async getDialog(data: GetDialog): Promise<Dialog> {
        const dialog = await db.query.dialogs.findFirst({
            where: (eq(dialogs.id, data.id))
        })

        if (!dialog) {
            throw new Error('Dialog not found')
        }

        return dialog
    }

    async getDialogsByUser(data: GetDialogs): Promise<Dialog[]> {
        const dialogFromUserID = await db.query.dialogs.findMany({
            where: (
                eq(dialogs.senderID, data.userID),
                eq(dialogs.receiverID, data.userID)
            ),
        })

        if (!dialogFromUserID.length) {
            throw new Error('Dialogs not found')
        }

        return dialogFromUserID
    }

    // update

    async updateIsDeletedForSender(data: UpdateIsDeletedForSender): Promise<Dialog> {
        const dialog = await db
            .update(dialogs)
            .set({
                isDeletedForSender: data.value
            })
            .where(eq(dialogs.id, data.id))
            .returning()

        if (!dialog) {
            throw new Error('Dialog not found')
        }

        return dialog[0]
    }

    async updateIsDeletedForReceiver(data: UpdateIsDeletedForReceiver): Promise<Dialog> {
        const dialog = await db
            .update(dialogs)
            .set({
                isDeletedForReceiver: data.value
            })
            .where(eq(dialogs.id, data.id))
            .returning()

        if (!dialog) {
            throw new Error('Dialog not found')
        }

        return dialog[0]
    }

    async updateLastMessage(data: UpdateLastMessage): Promise<Dialog> {
        const dialog = await db
            .update(dialogs)
            .set({
                lastMessage: data.lastMessage
            })
            .where(eq(dialogs.id, data.id))
            .returning()

        if (!dialog) {
            throw new Error('Dialog not found')
        }

        return dialog[0]
    }

    // delete

    async deleteDialog(data: DeleteDialog): Promise<Dialog> {
        const dialog = await db
            .delete(dialogs)
            .where(eq(dialogs.id, data.id))
            .returning()

        if (!dialog) {
            throw new Error('Dialog not found')
        }

        return dialog[0]
    }
}

export default new DialogsModel()