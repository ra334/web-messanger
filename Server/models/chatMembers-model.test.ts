import chatMembersModel from "./chatMembers-model";
import chatModel from "./chat-model";
import userModel from "./user-model";

let chatID: string;
let member_2ID: string;

describe("chatMemberModel", () => {
    beforeAll(async () => {
        const chat = await chatModel.createChat(`chatMembersModel`);
        await userModel.createUser("2", "test2", "test2", "test2@test.com");
        await userModel.createUser("3", "test3", "test3", "test3@test.com");
        await userModel.createUser("4", "test4", "test4", "test4@test.com");
        
        if (chat) chatID = chat?.id;
    });

    afterAll(async () => {
        await chatModel.deleteChatByID(chatID)
        await userModel.deleteUserByID('2')
        await userModel.deleteUserByID('3')
        await userModel.deleteUserByID('4')
    });

    it('should create a chat member', async () => {
        const member = await chatMembersModel.createChatMember('2', chatID, 'User')

        expect(member?.chat_id).toBe(chatID)
        expect(member?.user_id).toBe('2')
        expect(member?.member_role).toBe('User')
    })

    it('should get member id', async () => {
        const memberID = await chatMembersModel.getMemberID('2', chatID)

        if (memberID) {
            expect(memberID).toBeTruthy()
            member_2ID = memberID
        }
    })

    it('should update member role', async () => {
        const member = await chatMembersModel.updateRole(member_2ID, 'Admin')

        expect(member?.chat_id).toBe(chatID)
        expect(member?.user_id).toBe('2')
        expect(member?.member_role).toBe('Admin')
    })

    it('should get members', async () => {
        await chatMembersModel.createChatMember('3', chatID, 'User')
        await chatMembersModel.createChatMember('4', chatID, 'User')
        const members = await chatMembersModel.getMembers(chatID)

        expect(members).toHaveLength(3)
    })

    it('should delete an member', async () => {
        const member = await chatMembersModel.deleteMember(member_2ID, chatID)

        expect(member?.chat_id).toBe(chatID)
        expect(member?.member_role).toBe('Admin')
        expect(member?.user_id).toBe('2')
    })

    it('should delete members', async () => {
        const members = await chatMembersModel.deleteMembers(chatID)

        expect(members?.count).toBe(2)
    })
});
