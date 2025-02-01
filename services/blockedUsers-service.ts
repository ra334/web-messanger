import { z } from 'zod'
import blockedUsersModel from "@/db/models/blockedUsers-model";
import {
    BlockedUser,
    CreateBlockedUser,
    GetBlockdeUser,
    DeleteBlockedUser
} from "@/types/blockedUsers";

const idSchema = z.object({
    id: z.string().uuid()
})

const blockedUserSchema = z.object({
    userID: z.string().uuid()
})

class BlockedUserService {
    async blockUser(data: CreateBlockedUser): Promise<BlockedUser> {
        try {
            const parseData = blockedUserSchema.parse(data)
            return await blockedUsersModel.createBlockedUser(parseData)

        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getBlockedUser(data: GetBlockdeUser): Promise<BlockedUser> {
        try {
            const parseData = idSchema.parse(data)
            return await blockedUsersModel.getBlockedUser(parseData)

        } catch (error: any) {
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }
 
    async unblockUser(data: DeleteBlockedUser): Promise<BlockedUser> {
        try {
            const parseData = idSchema.parse(data)
            return await blockedUsersModel.deleteBlockedUser(parseData)
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }
}

export default new BlockedUserService()