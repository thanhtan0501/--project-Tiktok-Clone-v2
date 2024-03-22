import { Query, database } from "@/libs/AppWriteClient";
import useGetProfileById from "./useGetProfileById";

const useGetAllPost = async () => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_POST_ID),
            [Query.orderDesc("$id")]
        );
        const docs = response.documents;
        const data = docs.map(async (doc) => {
            const profile = await useGetProfileById(doc.user_id);
            return {
                id: doc?.$id,
                user_id: doc?.user_id,
                text: doc?.text,
                created_at: doc?.created_at,
                video_url: doc?.video_url,
                profile: {
                    user_id: profile?.user_id,
                    user_name: profile?.user_name,
                    nick_name: profile?.nick_name,
                    tick: profile?.tick,
                    avatar: profile?.avatar,
                },
            };
        });
        const result = await Promise.all(data);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetAllPost;
