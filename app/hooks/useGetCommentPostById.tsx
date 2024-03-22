import { Query, database } from "@/libs/AppWriteClient";
import useGetProfileById from "./useGetProfileById";

const useGetCommentPostById = async (postId: string) => {
    try {
        const comments = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_COMMENT_ID),
            [Query.equal("post_id", postId), Query.orderDesc("$id")]
        );

        const data = comments.documents.map(async (c) => {
            const profile = await useGetProfileById(c.user_id);
            return {
                id: c?.$id,
                user_id: c?.user_id,
                post_id: c?.post_id,
                text: c?.text,
                created_at: c?.created_at,
                profile: {
                    user_id: profile?.user_id,
                    user_name: profile?.user_name,
                    nick_name: profile?.nick_name,
                    tick: profile?.tick,
                    avatar: profile?.avatar,
                },
            };
        });
        const newData = await Promise.all(data);
        return newData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetCommentPostById;
