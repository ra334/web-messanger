import { db } from '@/db/postgress'
import { groupsMembers } from '@/db/schema/groupMembers'
import { eq } from 'drizzle-orm'
import type {
    GroupMembers,
    CreateGroupMember,
    GetGroupMember,
    GetGroupMembers,
    UpdateGroupIsAdmin,
    DeleteGroupMember
} from '@/types/groupMembers'

class GroupMembersModel {
    // creat

    async createGroupMember(data: CreateGroupMember): Promise<GroupMembers> {
        try {
            const groupMember = await db.insert(groupsMembers).values({
                groupID: data.groupID,
                userID: data.userID,
            }).returning()
            

            return groupMember[0]
        } catch (error: any) {
            const groupError = 'insert or update on table "groups_members" violates foreign key constraint "groups_members_group_id_groups_id_fk"'
            const userError = 'insert or update on table "groups_members" violates foreign key constraint "groups_members_user_id_users_id_fk"'

            if (error.message === groupError) {
                throw new Error('Group not found')
            } else if (error.message === userError) {
                throw new Error('User not found')
            }
            
            throw error
        }
    }

    // read

    async getGroupMember(data: GetGroupMember): Promise<GroupMembers> {
        const groupMember = await db.query.groupsMembers.findFirst({
            where: (eq(groupsMembers.id, data.id))
        })

        if (!groupMember) {
            throw new Error('Group member not found')
        }

        return groupMember
    }

    async getGroupMembers(data: GetGroupMembers): Promise<GroupMembers[]> {
        const groupMembers = await db.query.groupsMembers.findMany({
            where: (eq(groupsMembers.groupID, data.groupID))
        })

        if (!groupMembers.length) {
            throw new Error('Group members not found')
        }

        return groupMembers
    }

    // update

    async updateGroupIsAdmin(data: UpdateGroupIsAdmin): Promise<GroupMembers> {
        const groupMember = await db
            .update(groupsMembers)
            .set({
                isAdmin: data.isAdmin
            })
            .where(eq(groupsMembers.id, data.id))
            .returning()

        if (!groupMember.length) {
            throw new Error('Group member not found')
        }

        return groupMember[0]
    }

    // delete

    async deleteGroupMember(data: DeleteGroupMember) {
        const gorupMember = await db
            .delete(groupsMembers)
            .where(eq(groupsMembers.id, data.id))
            .returning()

        if (!gorupMember.length) {
            throw new Error('Group member not found')
        }

        return gorupMember[0]
    }
}

export default new GroupMembersModel()