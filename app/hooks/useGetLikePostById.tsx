import { Query, database } from "@/libs/AppWriteClient";

const useGetLikePostById = async (postId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_LIKE_ID),
            [Query.equal("post_id", postId)]
        );
        const docs = response.documents;
        const result = docs.map((doc) => ({
            id: doc?.$id,
            user_id: doc?.user_id,
            post_id: doc?.post_id,
        }));
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetLikePostById;
