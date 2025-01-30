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
                avatarURL: data.avatarURL
            }).returning()

            return group[0]
        } catch (error: any) {
            const creatorError = 'insert or update on table "groups" violates foreign key constraint "groups_creator_id_users_id_fk"'

            if (error.message === creatorError) {
                throw new Error('Creator not found')
            }
            
            throw error
        }
    }

    // read

    async getGroup(data: GetGroup): Promise<Group> {
        const group = await db.query.groups.findFirst({
            where: (eq(groups.id, data.id))
        })

        if (!group) {
            throw new Error('Group not found')
        }

        return group
    }

    async getGroupsFromCreator(data: GetGroupFromUser): Promise<Group[]> {
        const groupsFromUser = await db.query.groups.findMany({
            where: (eq(groups.creatorID, data.creatorID))
        })

        if (!groupsFromUser.length) {
            throw new Error('Groups not found')
        }

        return groupsFromUser
    }

    // update

    async updateCreatorID(data: UpdateCreatorID): Promise<Group> {
        const updated = await db
            .update(groups)
            .set({
                creatorID: data.creatorID
            })
            .where(eq(groups.id, data.id))
            .returning()

        if (!updated.length) {
            throw new Error('Group not found')
        }

        return updated[0]
    }

    async updateGroupName(data: UpdateGroupName): Promise<Group> {
        const updated = await db
            .update(groups)
            .set({
                name: data.name
            })
            .where(eq(groups.id, data.id))
            .returning()

        if (!updated.length) {
            throw new Error('Group not found')
        }

        return updated[0]
    }

    async updateGroupDescription(data: UpdateGroupDescription): Promise<Group> {
        const updated = await db
            .update(groups)
            .set({
                description: data.description
            })
            .where(eq(groups.id, data.id))
            .returning()

        if (!updated.length) {
            throw new Error('Group not found')
        }

        return updated[0]
    }

    async updateGroupAvatarURL(data: UpdateGroupAvatarURL): Promise<Group> {
        const updated = await db
            .update(groups)
            .set({
                avatarURL: data.avatarURL
            })
            .where(eq(groups.id, data.id))
            .returning()

        if (!updated.length) {
            throw new Error('Group not found')
        }

        return updated[0]
    }

    async updateGroupMembersCount(data: UpdateGroupMemberCount): Promise<Group> {
        const updated = await db
            .update(groups)
            .set({
                membersCount: data.memberCount
            })
            .where(eq(groups.id, data.id))
            .returning()

        if (!updated.length) {
            throw new Error('Group not found')
        }

        return updated[0]
    }

    // delete

    async deleteGroup(data: DeleteGroup): Promise<Group> {
        const deleted = await db
            .delete(groups)
            .where(eq(groups.id, data.id))
            .returning()

        if (!deleted.length) {
            throw new Error('Group not found')
        }

        return deleted[0]
    }
}

export default new GroupsModel()