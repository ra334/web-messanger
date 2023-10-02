import chatModel from "./chat-model";

describe("chatModel", () => {
    let chatID: string;

    afterAll(async () => {
        const chat = await chatModel.deleteChatByID(chatID);
        expect(chat?.id).toBe(chatID);
    });

    it("should create chat", async () => {
        const chat = await chatModel.createChat("test");
        expect(chat?.chat_name).toBe("test");
    });

    it("should get chat id by chat name", async () => {
        const chat = await chatModel.getChatID("test"); // return chat
        expect(chat).toBeTruthy();

        if (chat) chatID = chat;
    });

    it("should get chat name by id", async () => {
        const chatName = await chatModel.getChatName(chatID);
        expect(chatName).toBe("test");
    });

    it("should update chat name by id", async () => {
        const chat = await chatModel.updateChatName(chatID, "SuperPuperChat");
        if (chat) {
            expect(chat.chat_name).toBe("SuperPuperChat");
        }
    });
});