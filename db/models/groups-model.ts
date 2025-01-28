import { db } from '@/db/postgress'
import { groups } from '@/db/schema/groups'
import { eq } from 'drizzle-orm'
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

class GroupsModel {
    // create

    async createGroup(data: CreateGroup): Promise<Group> {
        try {
            const group = await db.insert(groups).values({
                creatorID: data.creatorID,
                name: data.name,
                description: data.description,
                avatarURL: data.avatarURL
            }).returning()

            return group[0]
        } catch (error) {
            console.error('Creating group error', error)
            throw error
        }
    }

    // read

    async getGroup(data: GetGroup): Promise<Group> {
        try {
            const group = await db.query.groups.findFirst({
                where: (eq(groups.id, data.id))
            })

            if (!group) {
                throw new Error('Group not found')
            }

            return group
        } catch (error) {
            console.error('Getting group error', error)
            throw error
        }
    }

    async getGroupsFromCreator(data: GetGroupFromUser): Promise<Group[]> {
        try {
            const groupsFromUser = await db.query.groups.findMany({
                where: (eq(groups.creatorID, data.creatorID))
            })

            return groupsFromUser
        } catch (error) {
            console.error('Getting groups from user error', error)
            throw error
        }

    }

    // update

    async updateCreatorID(data: UpdateCreatorID) {
        try {
            const updated = await db
                .update(groups)
                .set({
                    creatorID: data.creatorID
                })
                .where(eq(groups.id, data.id))

            return updated
        } catch (error) {
            console.error('Updating creator ID error', error)
            throw error
        }
    }

    async updateGroupName(data: UpdateGroupName) {
        try {
            const updated = await db
                .update(groups)
                .set({
                    name: data.name
                })
                .where(eq(groups.id, data.id))

            return updated
        } catch (error) {
            console.error('Updating group name error', error)
            throw error
        }

    }

    async updateGroupDescription(data: UpdateGroupDescription) {
        try {
            const updated = await db
                .update(groups)
                .set({
                    description: data.description
                })
                .where(eq(groups.id, data.id))

            return updated
        } catch (error) {
            console.error('Updating group description error', error)
            throw error
        }
    }

    async updateGroupAvatarURL(data: UpdateGroupAvatarURL) {
        try {
            const updated = await db
                .update(groups)
                .set({
                    avatarURL: data.avatarURL
                })
                .where(eq(groups.id, data.id))

            return updated
        } catch (error) {
            console.error('Updating group avatar URL error', error)
            throw error
        }
    }

    async updateGroupMembersCount(data: UpdateGroupMemberCount) {
        try {
            const updated = await db
                .update(groups)
                .set({
                    membersCount: data.memberCount
                })
                .where(eq(groups.id, data.id))

            return updated
        } catch (error) {
            console.error('Updating group members count error', error)
            throw error
        }
    }

    // delete

    async deleteGroup(data: DeleteGroup) {
        try {
            const deleted = await db
                .delete(groups)
                .where(eq(groups.id, data.id))
        } catch (error) {
            console.error('Deleting group error', error)
            throw error
        }
    }
}

export default new GroupsModel()