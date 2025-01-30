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
        } catch (error: any) {
            const userError = 'insert or update on table "friends" violates foreign key constraint "friends_user_id_users_id_fk"'
            const friendError = 'insert or update on table "friends" violates foreign key constraint "friends_friend_id_users_id_fk"'
            
            if (error.message === userError) {
                throw new Error('User not found')
            } else if (error.message === friendError) {
                throw new Error('Friend not found')
            }

            throw error
        }
    }

    // read

    async getFriend(data: GetFriend): Promise<Friend> {
        const friend = await db.query.friends.findFirst({
            where: (eq(friends.id, data.id))
        })

        if (!friend) {
            throw new Error('Friend not found')
        }

        return friend
    }

    async getFriendsFromUser(data: GetFriends): Promise<Friend[]> {
        const friendsFromUser = await db.query.friends.findMany({
            where: (eq(friends.userID, data.userID))
        })

        if (!friendsFromUser.length) {
            throw new Error('Friends not found')
        }

        return friendsFromUser
    }

    // update

    async updateFriendName(data: UpdateFriendName): Promise<Friend> {
        const friend = await db
            .update(friends)
            .set({
                firstName: data.firstName
            })
            .where(eq(friends.id, data.id))
            .returning()

        if (!friend.length) {
            throw new Error('Friend not found')
        }

        return friend[0]
    }

    // delete

    async deleteFriend(data: DeleteFriend): Promise<Friend> {
        const friend = await db
            .delete(friends)
            .where(eq(friends.id, data.id))
            .returning()

        if (!friend.length) {
            throw new Error('Friend not found')
        }

        return friend[0]
    }
}

export default new FriendsModel()