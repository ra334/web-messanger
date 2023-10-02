import userModel from "./user-model";
import chatModel from "./chat-model";
import chatMembersModel from "./chatMembers-model";
import messageModel from "./message-model";

describe("Message Model Tests", () => {
    const userID = String(Date.now());
    let chatID = "";
    let senderID = "";
    let messageID = "";
    let chatName = `chat-${userID}`;
    let userNickname = `nick-${userID}`;
    let userEmail = `test-${userID}@test.com`;

    beforeAll(async () => {
        await userModel.createUser(userID, userNickname, "pass", userEmail);
        const chat = await chatModel.createChat(chatName);

        chatID = chat.id;

        const member = await chatMembersModel.createChatMember(
            userID,
            chatID,
            "User",
        );

        senderID = member.id;
    });

    afterAll(async () => {
        await chatMembersModel.deleteMember(senderID, chatID);
        await chatModel.deleteChatByID(chatID);
        await userModel.deleteUserByID(userID);
    });

    describe("Message Creation", () => {
        it("should create a message", async () => {
            const message = await messageModel.createMessage(senderID, "hello");

            expect(message.sender_id).toBe(senderID);
            expect(message.message_text).toBe("hello");
        });
    });

    describe("Message Retrieval", () => {
        it("should get a message", async () => {
            const message = await messageModel.getMessage(senderID, "hello");

            if (message) {
                messageID = message.id;

                expect(message.sender_id).toBe(senderID);
                expect(message.message_text).toBe("hello");
            }
        });

        it("should get messages", async () => {
            await messageModel.createMessage(senderID, "hi bro");
            await messageModel.createMessage(senderID, "What's up");
            const messages = await messageModel.getMessages(senderID);

            expect(messages[0].sender_id).toBe(senderID);
            expect(messages[0].message_text).toBe("hello");

            expect(messages[1].sender_id).toBe(senderID);
            expect(messages[1].message_text).toBe("hi bro");

            expect(messages[2].sender_id).toBe(senderID);
            expect(messages[2].message_text).toBe("What's up");
        });
    });

    describe("Message Update and Deletion", () => {
        it("should update a message", async () => {
            const message = await messageModel.updateMessage(messageID, "hi");

            expect(message.id).toBe(messageID);
            expect(message.message_text).toBe("hi");
            expect(message.is_updated).toBeTruthy();
        });

        it("should delete a message", async () => {
            const message = await messageModel.deleteMessage(messageID);

            expect(message.sender_id).toBe(senderID);
            expect(message.message_text).toBe("hi");
        });

        it("should delete messages", async () => {
            const messages = await messageModel.deleteMessages(senderID);

            expect(messages.count).toBe(2);
        });
    });
});