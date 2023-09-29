import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ChatMemberModel {
    async createChatMember(
        userID: string,
        chatID: string,
        memberRole: string
    ) {
        try {
            await prisma.$connect()
            const member = await prisma.chatMembers.create({
                data: {
                    user_id: userID,
                    chat_id: chatID,
                    member_role: memberRole
                }
            })

            return member
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateRole(memberID: string, memberRole: string) {
        try {
            await prisma.$connect()
            const member = await prisma.chatMembers.update({
                where: {
                    id: memberID,
                },
                data: {
                    member_role: memberRole,
                },
            });
            return member
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getMemberID(userID: string, chatID: string) {
        try {
            await prisma.$connect()
            const member = await prisma.chatMembers.findFirst({
                where: {
                    user_id: userID,
                    chat_id: chatID
                }
            })

            if (member) {
                return member.id
            }

            return member
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getMember(memberID: string) {
        try {
            await prisma.$connect()
            const member = await prisma.chatMembers.findFirst({
                where: {
                    id: memberID
                }
            })

            return member
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getMembers(chatID: string) {
        try {
            await prisma.$connect()
            const members = await prisma.chatMembers.findMany({
                where: {
                    chat_id: chatID
                }
            })

            return members
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async deleteMember(memberID: string, chatID: string) {
        try {
            await prisma.$connect()
            const member = await prisma.chatMembers.delete({
                where: {
                    id: memberID,
                    chat_id: chatID
                }
            })

            return member
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async deleteMembers(chatID: string) {
        try {
            await prisma.$connect()
            const members = await prisma.chatMembers.deleteMany({
                where: {
                    chat_id: chatID
                }
            })

            return members
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}

export default new ChatMemberModel()