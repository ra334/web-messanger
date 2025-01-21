interface Message {
    id: string;
    dialogID: string;
    senderID: string;
    text: string;
    is_edited: boolean;
    is_readed: boolean;
    createdAt: Date;
}

interface CreateMessage {
    dialogID: string;
    senderID: string;
    text: string;
}

interface GetMessage {
    id: string;
}

interface GetMessagesFromDialog {
    dialogID: string;
}

interface GetMessagesFromUser {
    userID: string;
    dialogID: string;
}

interface UpdateMessageText {
    id: string;
    text: string;
}

interface UpdateMessageIsEdited {
    id: string;
    isEdited: boolean;
}

interface UpdateMessageIsReaded {
    id: string;
    isReaded: boolean;
}

interface DeleteMessage {
    id: string;
}

export {
    Message,
    CreateMessage,
    GetMessage,
    GetMessagesFromDialog,
    GetMessagesFromUser,
    UpdateMessageText,
    UpdateMessageIsEdited,
    UpdateMessageIsReaded,
    DeleteMessage
}