import { ID, database, storage } from "@/libs/AppWriteClient";

const useCreatePost = async (file: File, userId: string, caption: string) => {
    let videoId = Math.random().toString(36).slice(2, 22);

    try {
        const post = await database.createDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_POST_ID),
            ID.unique(),
            {
                user_id: userId,
                text: caption,
                video_url: videoId,
                created_at: new Date().toISOString(),
            }
        );
        await storage.createFile(
            String(process.env.NEXT_PUBLIC_APP_WRITE_BUCKET_ID),
            videoId,
            file
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useCreatePost;
