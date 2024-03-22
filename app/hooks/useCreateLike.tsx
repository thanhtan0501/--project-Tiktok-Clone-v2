import { ID, database } from "@/libs/AppWriteClient";

const useCreateLike = async (userId: string, postId: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_LIKE_ID),
            ID.unique(),
            {
                user_id: userId,
                post_id: postId,
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useCreateLike;
