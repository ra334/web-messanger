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
        const parseData = blockedUserSchema.parse(data)
        return await blockedUsersModel.createBlockedUser(parseData)
    }

    async getBlockedUser(data: GetBlockdeUser): Promise<BlockedUser> {
        const parseData = idSchema.parse(data)
        return await blockedUsersModel.getBlockedUser(parseData)
    }

    async unblockUser(data: DeleteBlockedUser): Promise<BlockedUser> {
        const parseData = idSchema.parse(data)
        return await blockedUsersModel.deleteBlockedUser(parseData)
    }
}

export default new BlockedUserService()