import { ID, database } from "@/libs/AppWriteClient";

const useCreateComment = async (
    userId: string,
    postId: string,
    comment: string
) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_COMMENT_ID),
            ID.unique(),
            {
                user_id: userId,
                post_id: postId,
                text: comment,
                created_at: new Date().toISOString(),
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useCreateComment;
