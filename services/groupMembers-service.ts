import { z } from 'zod'
import groupMembersModel from '@/db/models/groupMembers-model'
import {
    GroupMembers,
    CreateGroupMember,
    GetGroupMember,
    GetGroupMembers,
    UpdateGroupIsAdmin,
    DeleteGroupMember
} from '@/types/groupMembers'

const idSchema = z.object({
    id: z.string().uuid()
})

const createGroupMemberSchema = z.object({
    groupID: z.string().uuid(),
    userID: z.string().uuid()
})

const getGroupMembersSchema = z.object({
    groupID: z.string().uuid()
})

const updateGroupIsAdminSchema = z.object({
    ...idSchema.shape,
    isAdmin: z.boolean()
})



class GroupMembersService {
    async createGroupMember(data: CreateGroupMember): Promise<GroupMembers> {
        try {
            const parseData = createGroupMemberSchema.parse(data)
            return await groupMembersModel.createGroupMember(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        } 
    }

    async getGroupMember(data: GetGroupMember): Promise<GroupMembers> {
        try {
            const parseData = idSchema.parse(data)
            return await groupMembersModel.getGroupMember(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async getGroupsMembers(data: GetGroupMembers): Promise<GroupMembers[]> {
        try {
            const parseData = getGroupMembersSchema.parse(data)
            return await groupMembersModel.getGroupMembers(parseData)
        } catch (error: any) {
            
            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async updateGroupIsAdmin(data: UpdateGroupIsAdmin): Promise<GroupMembers> {
        try {
            const parseData = updateGroupIsAdminSchema.parse(data)
            return await groupMembersModel.updateGroupIsAdmin(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }

    async deleteGroupMember(data: DeleteGroupMember): Promise<GroupMembers> {
        try {
            const parseData = idSchema.parse(data)
            return await groupMembersModel.deleteGroupMember(parseData)
        } catch (error: any) {

            if (error instanceof z.ZodError) {
                throw new Error(error.errors[0].message)
            }

            throw error
        }
    }
}

export default new GroupMembersService()