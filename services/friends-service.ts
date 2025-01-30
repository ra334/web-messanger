import { z } from 'zod'
import friendsModel from '@/db/models/friends-model'
import {
    Friend,
    CreateFriend,
    GetFriend,
    GetFriends,
    UpdateFriendName,
    DeleteFriend
} from '@/types/friends'

const idSchema = z.object({
    id: z.string().uuid()
})

const userIDSchema = z.object({
    userID: z.string().uuid()
})

const friendIDSchema = z.object({
    friendID: z.string().uuid()
})

const friendFristNameSchema = z.object({
    firstName: z.string().min(1, 'First name is required')
})

const friendSchema = z.object({
    ...userIDSchema.shape,
    ...friendIDSchema.shape,
    ...friendFristNameSchema.shape
})
const updateFriendNameSchema = z.intersection(idSchema, friendFristNameSchema)

class FriendsService {
    async createFriend(data: CreateFriend): Promise<Friend> {
        const parseData = friendSchema.parse(data)
        return await friendsModel.createFriend(parseData);
    }

    async getFriend(data: GetFriend): Promise<Friend> {
        const parseData = idSchema.parse(data)
        return await friendsModel.getFriend(parseData)
    }

    async getFriendsFromUser(data: GetFriends): Promise<Friend[]> {
        const parseData = userIDSchema.parse(data)
        return await friendsModel.getFriendsFromUser(parseData)
    }

    async updateFriendName(data: UpdateFriendName): Promise<Friend> {
        const parseData = updateFriendNameSchema.parse(data)
        return await friendsModel.updateFriendName(parseData)
    }

    async deleteFriend(data: DeleteFriend): Promise<Friend> {
        const parseData = idSchema.parse(data)
        return await friendsModel.deleteFriend(parseData)
    }
}

export default new FriendsService();