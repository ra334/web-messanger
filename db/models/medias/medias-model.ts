import { db } from '@/db/postgress'
import { medias } from '@/db/schema/medias'
import { eq } from 'drizzle-orm'
import type {
    Media,
    CreateMedia,
    GetMedia,
    UpdateMediaType,
    UpdateMediaURL,
    UpdateMediaFileName,
    UpdateMediaSize,
    UpdateMediaMetadata,
    DeleteMedia
} from './media'

class MediasModel {
    // create

    async createMedia(data: CreateMedia): Promise<Media> {
        const media = await db.insert(medias).values({
            userID: data.userID,
            type: data.type,
            url: data.url,
            fileName: data.fileName,
            size: data.size,
            metadata: data.metadata
        }).returning()

        return media[0]
    }

    // read
    
    async getMedia(data: GetMedia): Promise<Media> {
        const media = await db.query.medias.findFirst({
            where: (eq(medias.id, data.id))
        })

        if (!media) {
            throw new Error('Media not found')
        }

        return media
    }
    
    // update
    
    async updateMediaType(data: UpdateMediaType): Promise<Media> {
        const media = await db
            .update(medias)
            .set({
                type: data.type
            })
            .where(eq(medias.id, data.id))
            .returning()

        return media[0]
    }

    async updateMediaURL(data: UpdateMediaURL): Promise<Media> {
        const media = await db
            .update(medias)
            .set({
                url: data.url
            })
            .where(eq(medias.id, data.id))
            .returning()

        return media[0]
    }

    async updateMediaFileName(data: UpdateMediaFileName): Promise<Media>{
        const media = await db
            .update(medias)
            .set({
                fileName: data.fileName
            })
            .where(eq(medias.id, data.id))
            .returning()

        return media[0]
    }

    async updateMediaSize(data: UpdateMediaSize): Promise<Media> {
        const media = await db
            .update(medias)
            .set({
                size: data.size
            })
            .where(eq(medias.id, data.id))
            .returning()

        return media[0]
    }

    async updateMediaMetadata(data: UpdateMediaMetadata): Promise<Media>{
        const media = await db
            .update(medias)
            .set({
                metadata: data.metadata
            })
            .where(eq(medias.id, data.id))
            .returning()

        return media[0]
    }
    
    // delete

    async deleteMedia(data: DeleteMedia): Promise<Media> {
        const media = await db
            .delete(medias)
            .where(eq(medias.id, data.id))
            .returning()

        return media[0]
    }
}

export default new MediasModel()