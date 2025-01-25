const mediaTypes = 'image' | 'video' | 'audio' | 'file'

interface Media {
    id: string;
    userID: string;
    type: mediaTypes;
    url: string;
    fileName: string;
    size: number;
    createdAt: Date;
    metadata: any;
}

interface CreateMedia {
    userID: string;
    type: mediaTypes;
    url: string;
    fileName: string;
    size: number;
    metadata: JSON;
}

interface GetMedia {
    id: string;
}

interface UpdateMediaType {
    id: string;
    type: mediaTypes;
}

interface UpdateMediaURL {
    id: string;
    url: string;
}

interface UpdateMediaFileName {
    id: string;
    fileName: string;
}

interface UpdateMediaSize {
    id: string;
    size: number;
}

interface UpdateMediaMetadata {
    id: string;
    metadata: JSON;
}

interface DeleteMedia {
    id: string;
}

export {
    Media,
    CreateMedia,
    GetMedia,
    UpdateMediaType,
    UpdateMediaURL,
    UpdateMediaFileName,
    UpdateMediaSize,
    UpdateMediaMetadata,
    DeleteMedia
}