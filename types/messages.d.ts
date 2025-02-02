interface Message {
    id: string;
    dialogID: string | null;
    groupID: string | null;
    senderID: string;
    messageType: 'text' | 'media';
    mediaID: string | null;
    text: string | null;
    is_edited: boolean;
    is_readed: boolean;
    isDeleted: boolean;
    createdAt: Date;
}

interface CreateMessage {
    dialogID: string;
    senderID: string;
    messageType: 'text' | 'media';
    mediaID: string | null;
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