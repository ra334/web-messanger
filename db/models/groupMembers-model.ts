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
        } catch (error) {
            console.error('Creating group member error:', error)
            throw error
        }
    }

    // read

    async getGroupMember(data: GetGroupMember): Promise<GroupMembers> {
        try {
            const groupMember = await db.query.groupsMembers.findFirst({
                where: (eq(groupsMembers.id, data.id))
            })

            if (!groupMember) {
                throw new Error('Group member not found')
            }

            return groupMember
        } catch (error) {
            console.error('Getting group member error:', error)
            throw error
        }
    }

    async getGroupMembers(data: GetGroupMembers) {
        try {
            const groupMembers = await db.query.groupsMembers.findMany({
                where: (eq(groupsMembers.groupID, data.groupID)),
                limit: 10
            })

            return groupMembers
        } catch (error) {
            console.error('Getting group members error:', error)
            throw error
        }
    }

    // update

    async updateGroupIsAdmin(data: UpdateGroupIsAdmin) {
        try {
            const groupMember = await db
                .update(groupsMembers)
                .set({
                    isAdmin: data.isAdmin
                })
                .where(eq(groupsMembers.id, data.id))
                .returning()

            return groupMember[0]
        } catch (error) {
            console.error('Updating group member error:', error)
            throw error
        }
    }

    // delete

    async deleteGroupMember(data: DeleteGroupMember) {
        try {
            const gorupMember = await db
                .delete(groupsMembers)
                .where(eq(groupsMembers.id, data.id))
                .returning()
        } catch (error) {
            console.error('Deleting group member error:', error)
            throw error
        }
    }
}

export default new GroupMembersModel()