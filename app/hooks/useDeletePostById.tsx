import { database, storage } from "@/libs/AppWriteClient";
import useGetLikePostById from "./useGetLikePostById";
import useDeleteLike from "./useDeleteLike";
import useGetCommentPostById from "./useGetCommentPostById";
import useDeleteComment from "./useDeleteComment";

const useDeletePostById = async (postId: string, currentImage: string) => {
    try {
        const likes = await useGetLikePostById(postId);
        const comments = await useGetCommentPostById(postId);
        likes.forEach(async (like) => {
            await useDeleteLike(like?.id);
        });
        comments.forEach(async (c) => {
            await useDeleteComment(c?.id);
        });

        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_POST_ID),
            postId
        );

        await storage.deleteFile(
            String(process.env.NEXT_PUBLIC_APP_WRITE_BUCKET_ID),
            currentImage
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useDeletePostById;
