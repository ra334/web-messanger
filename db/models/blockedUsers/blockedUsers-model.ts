import { db } from '@/db/postgress'
import { blockedUsers } from '@/db/schema/blockedUsers'
import { eq } from 'drizzle-orm'
import {
    BlockedUser,
    CreateBlockedUser,
    GetBlockdeUser,
    GetBlockedUsers,
    DeleteBlockedUser
} from './blockedUsers-model.d'


// create

async function createBlockedUser(data: CreateBlockedUser): Promise<BlockedUser> {
    try {
        const blockedUser = await db.insert(blockedUsers).values({
            blockedID: data.blockedID
        }).returning()

        return blockedUser[0]
    } catch (error) {
        console.error('Creating blocked user error:', error)
        throw error
    }
}

// read

async function getBlockedUser(data: GetBlockdeUser): Promise<BlockedUser> {
    try {
        const blockedUser = await db.query.blockedUsers.findFirst({
            where: (eq(blockedUsers.id, data.id))
        })

        if (!blockedUser) {
            throw new Error('Blocked user not found')
        }

        return blockedUser
    } catch (error) {
        console.error('Getting blocked user error:', error)
        throw error
    }
}

async function getBlockdeUsers(data: GetBlockdeUser): Promise<BlockedUser[]> {
    try {
        const users = await db.query.blockedUsers.findMany({
            where: (eq(blockedUsers.id, data.id))
        })

        return users
    } catch (error) {
        console.error('Getting blocked users error:', error)
        throw error
    }

}

// update



// delete

async function deleteBlockedUser(data: DeleteBlockedUser): Promise<BlockedUser> {
    try {
        const user = await db
            .delete(blockedUsers)
            .where(eq(blockedUsers.id, data.id))
            .returning()

        return user[0]
    } catch (error) {
        console.error('Deleting blocked user error:', error)
        throw error
    }
}

export {
    createBlockedUser,
    getBlockedUser,
    getBlockdeUsers,
    deleteBlockedUser
}