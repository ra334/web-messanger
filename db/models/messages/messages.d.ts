interface Message {
    id: string;
    dialogID: string;
    senderID: string;
    text: string;
    is_edited: boolean;
    is_readed: boolean;
    createdAt: Date;
    updatedAt: Date;
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

interface UpdateMessageUpdatedAt {
    id: string;
    updatedAt: Date;
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
    UpdateMessageUpdatedAt,
    DeleteMessage
}