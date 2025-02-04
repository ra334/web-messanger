import { z } from 'zod';
import groupsModel from "@/db/models/groups-model";
import type {
    Group,
    CreateGroup,
    GetGroup,
    GetGroupFromUser,
    UpdateCreatorID,
    UpdateGroupName,
    UpdateGroupDescription,
    UpdateGroupAvatarURL,
    UpdateGroupMemberCount,
    DeleteGroup
} from '@/types/groups'

const idSchema = z.object({
    id: z.string().uuid()
})

const creatorIdSchema = z.object({
    creatorID: z.string().uuid()
})

const updateCreatorIDSchema = z.intersection(idSchema, creatorIdSchema)

const groupNameSchema = idSchema.extend({
    name: z.string().min(1, 'Name is required')
})

const groupDescriptionSchema = idSchema.extend({
    description: z.string().min(1, 'Description is required')
})

const groupAvatarURLSchema = idSchema.extend({
    avatarURL: z.string().url('Invalid URL')
})

const groupMembersSchema = idSchema.extend({
    memberCount: z.number().int().min(0, 'Member count must be a positive integer')
})

const createGroupSchema = creatorIdSchema.extend({
    name: z.string().min(1, 'Name is required'),
    avatarURL: z.string().url('Invalid URL')
})

class GroupsService {
    private handleValidationError(error: unknown): never {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw error
    }

    async createGroup(data: CreateGroup): Promise<Group> {
        try {
            const parseData = createGroupSchema.parse(data)
            return await groupsModel.createGroup(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getGroup(data: GetGroup): Promise<Group> {
        try {
            const parseData = idSchema.parse(data)
            return await groupsModel.getGroup(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async getGroupsFromCreator(data: GetGroupFromUser): Promise<Group[]> {
        try {
            const parseData = creatorIdSchema.parse(data)
            return await groupsModel.getGroupsFromCreator(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateCreatorID(data: UpdateCreatorID): Promise<Group> {
        try {
            const parseData = updateCreatorIDSchema.parse(data)
            return await groupsModel.updateCreatorID(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    } 

    async updateGroupName(data: UpdateGroupName): Promise<Group> {
        try {
            const parseData = groupNameSchema.parse(data)
            return await groupsModel.updateGroupName(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateGroupDescription(data: UpdateGroupDescription): Promise<Group> {
        try {
            const parseData = groupDescriptionSchema.parse(data)
            return await groupsModel.updateGroupDescription(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateGroupAvatarURL(data: UpdateGroupAvatarURL): Promise<Group> {
        try {
            const parseData = groupAvatarURLSchema.parse(data)
            return await groupsModel.updateGroupAvatarURL(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async updateGroupMemberCount(data: UpdateGroupMemberCount): Promise<Group> {
        try {
            const parseData = groupMembersSchema.parse(data)
            return await groupsModel.updateGroupMembersCount(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }

    async deleteGroup(data: DeleteGroup): Promise<Group> {
        try {
            const parseData = idSchema.parse(data)
            return await groupsModel.deleteGroup(parseData)
        } catch (error: any) {
            this.handleValidationError(error)
        }
    }
}

export default new GroupsService()