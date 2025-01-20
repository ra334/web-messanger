import { db } from '@/db/postgress'
import { groups } from '@/db/schema/groups'
import { eq } from 'drizzle-orm'
import {
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
} from './groups-model.d'

// create

async function createGroup(data: CreateGroup): Promise<Group> {
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

async function getGroup(data: GetGroup): Promise<Group> {
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

async function getGroupsFromCreator(data: GetGroupFromUser): Promise<Group[]> {
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

async function updateCreatorID(data: UpdateCreatorID) {
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

async function updateGroupName(data: UpdateGroupName) {
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

async function updateGroupDescription(data: UpdateGroupDescription) {
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

async function updateGroupAvatarURL(data: UpdateGroupAvatarURL) {
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

async function updateGroupMembersCount(data: UpdateGroupMemberCount) {
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

async function deleteGroup(data: DeleteGroup) {
    try {
        const deleted = await db
            .delete(groups)
            .where(eq(groups.id, data.id))
    } catch (error) {
        console.error('Deleting group error', error)
        throw error
    }
}

export {
    createGroup,
    getGroup,
    getGroupsFromCreator,
    updateCreatorID,
    updateGroupName,
    updateGroupDescription,
    updateGroupAvatarURL,
    updateGroupMembersCount,
    deleteGroup
}