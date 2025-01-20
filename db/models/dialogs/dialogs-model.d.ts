interface Dialog {
    id: string;
    senderID: string;
    receiverID: string;
    isDeletedForSender: boolean;
    isDeletedForReceiver: boolean;
    lastMessage: string;
    createdAt: Date;
}

interface CreateDialog {
    senderID: string;
    receiverID: string;
    lastMessage: string;
}

interface GetDialog {
    id: string;
}

interface GetDialogs {
    userID: string;
}

interface UpdateIsDeletedForSender {
    id: string;
    value: boolean;
}

interface UpdateIsDeletedForReceiver {
    id: string;
    value: boolean;
}

interface UpdateLastMessage {
    id: string;
    lastMessage: string;
}

interface DeleteDialog {
    id: string;
}

export {
    Dialog,
    CreateDialog,
    GetDialog,
    GetDialogs,
    UpdateIsDeletedForSender,
    UpdateIsDeletedForReceiver,
    UpdateLastMessage,
    DeleteDialog
}