import { database } from "@/libs/AppWriteClient";
import useGetProfileById from "./useGetProfileById";

const useGetPostById = async (id: string) => {
    try {
        const post = await database.getDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_POST_ID),
            id
        );
        const profile = await useGetProfileById(post?.user_id);
        return {
            id: post?.$id,
            user_id: post?.user_id,
            text: post?.text,
            created_at: post?.created_at,
            video_url: post?.video_url,
            profile: {
                user_id: profile?.user_id,
                user_name: profile?.user_name,
                nick_name: profile?.nick_name,
                tick: profile?.tick,
                avatar: profile?.avatar,
            },
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetPostById;
