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
        try {
            const parseData = friendSchema.parse(data)
            return await friendsModel.createFriend(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getFriend(data: GetFriend): Promise<Friend> {
        try {
            const parseData = idSchema.parse(data)
            return await friendsModel.getFriend(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getFriendsFromUser(data: GetFriends): Promise<Friend[]> {
        try {
            const parseData = userIDSchema.parse(data)
            return await friendsModel.getFriendsFromUser(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async updateFriendName(data: UpdateFriendName): Promise<Friend> {
        try {
            const parseData = updateFriendNameSchema.parse(data)
            return await friendsModel.updateFriendName(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async deleteFriend(data: DeleteFriend): Promise<Friend> {
        try {
            const parseData = idSchema.parse(data)
            return await friendsModel.deleteFriend(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }
}

export default new FriendsService();