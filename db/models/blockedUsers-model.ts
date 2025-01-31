import { db } from '@/db/postgress'
import { blockedUsers } from '@/db/schema/blockedUsers'
import { eq } from 'drizzle-orm'
import type {
    BlockedUser,
    CreateBlockedUser,
    GetBlockdeUser,
    DeleteBlockedUser
} from '@/types/blockedUsers'

class BlockedUsersModel {
    // create

    async createBlockedUser(data: CreateBlockedUser): Promise<BlockedUser> {
        try {
            const blockedUser = await db.insert(blockedUsers).values({
                userID: data.userID
            }).returning()

            return blockedUser[0]
        } catch (error: any) {
            const userError = 'insert or update on table "blocked_users" violates foreign key constraint "blocked_users_user_id_users_id_fk"'

            if (error.message === userError) {
                throw new Error('User not found')
            }

            throw error
        }
    }

    // read

    async getBlockedUser(data: GetBlockdeUser): Promise<BlockedUser> {
        const blockedUser = await db.query.blockedUsers.findFirst({
            where: (eq(blockedUsers.id, data.id))
        })

        if (!blockedUser) {
            throw new Error('Blocked user not found')
        }

        return blockedUser
    }

    // update



    // delete

    async deleteBlockedUser(data: DeleteBlockedUser): Promise<BlockedUser> {
        const user = await db
            .delete(blockedUsers)
            .where(eq(blockedUsers.id, data.id))
            .returning()

        if (!user.length) {
            throw new Error('Blocked user not found')
        }

        return user[0]
    }
}

export default new BlockedUsersModel()