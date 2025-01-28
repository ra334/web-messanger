import { db } from '@/db/postgress'
import { friends } from '@/db/schema/friends'
import { eq } from 'drizzle-orm'
import type {
    Friend,
    CreateFriend,
    GetFriend,
    GetFriends,
    UpdateFriendName,
    DeleteFriend
} from '@/types/friends'

class FriendsModel {
    // create

    async createFriend(data: CreateFriend): Promise<Friend> {
        try {
            const friend = await db.insert(friends).values({
                userID: data.userID,
                friendID: data.friendID,
                firstName: data.firstName
            }).returning()

            return friend[0]
        } catch (error) {
            console.error('Creating friend failed:', error)
            throw error
        }
    }

    // read

    async getFriend(data: GetFriend): Promise<Friend> {
        try {
            const friend = await db.query.friends.findFirst({
                where: (eq(friends.id, data.id))
            })

            if (!friend) {
                throw new Error('Friend not found')
            }

            return friend
        } catch (error) {
            console.error('Getting friend failed:', error)
            throw error
        }
    }

    async getFriendsFromUser(data: GetFriends) {
        try {
            const friendsFromUser = await db.query.friends.findMany({
                where: (eq(friends.userID, data.userID))
            })

            return friendsFromUser
        } catch (error) {
            console.error('Getting friends failed:', error)
            throw error
        }
    }

    // update

    async updateFriendName(data: UpdateFriendName) {
        try {
            const friend = await db
                .update(friends)
                .set({
                    firstName: data.firstName
                })
                .where(eq(friends.id, data.id))
                .returning()

            return friend[0]
        } catch (error) {
            console.error('Updating friend failed:', error)
            throw error
        }
    }

    // delete

    async deleteFriend(data: DeleteFriend) {
        try {
            const friend = await db
                .delete(friends)
                .where(eq(friends.id, data.id))
                .returning()

            return friend[0]
        } catch (error) {
            console.error('Deleting friend failed:', error)
            throw error
        }
    }
}

export default new FriendsModel()