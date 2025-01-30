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
    async createGroup(data: CreateGroup): Promise<Group> {
        const parseData = createGroupSchema.parse(data)
        return await groupsModel.createGroup(parseData)
    }

    async getGroup(data: GetGroup): Promise<Group> {
        const parseData = idSchema.parse(data)
        return await groupsModel.getGroup(parseData)
    }

    async getGroupsFromCreator(data: GetGroupFromUser): Promise<Group[]> {
        const parseData = creatorIdSchema.parse(data)
        return await groupsModel.getGroupsFromCreator(parseData)
    }

    async updateCreatorID(data: UpdateCreatorID): Promise<Group> {
        const parseData = updateCreatorIDSchema.parse(data)
        return await groupsModel.updateCreatorID(parseData)
    }

    async updateGroupName(data: UpdateGroupName): Promise<Group> {
        const parseData = groupNameSchema.parse(data)
        return await groupsModel.updateGroupName(parseData)
    }

    async updateGroupDescription(data: UpdateGroupDescription): Promise<Group> {
        const parseData = groupDescriptionSchema.parse(data)
        return await groupsModel.updateGroupDescription(parseData)
    }

    async updateGroupAvatarURL(data: UpdateGroupAvatarURL): Promise<Group> {
        const parseData = groupAvatarURLSchema.parse(data)
        return await groupsModel.updateGroupAvatarURL(parseData)
    }

    async updateGroupMemberCount(data: UpdateGroupMemberCount): Promise<Group> {
        const parseData = groupMembersSchema.parse(data)
        return await groupsModel.updateGroupMembersCount(parseData)
    }

    async deleteGroup(data: DeleteGroup): Promise<Group> {
        const parseData = idSchema.parse(data)
        return await groupsModel.deleteGroup(parseData)
    }
}

export default new GroupsService()