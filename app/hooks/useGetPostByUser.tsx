import { Query, database } from "@/libs/AppWriteClient";

const useGetPostByUser = async (user_id: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_POST_ID),
            [Query.equal("user_id", user_id), Query.orderDesc("$id")]
        );
        const docs = response.documents;
        const data = docs.map((doc) => {
            return {
                id: doc?.$id,
                user_id: doc?.user_id,
                text: doc?.text,
                created_at: doc?.created_at,
                video_url: doc?.video_url,
            };
        });
        const result = await Promise.all(data);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetPostByUser;
