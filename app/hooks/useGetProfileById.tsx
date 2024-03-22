import { database, Query } from "@/libs/AppWriteClient";

const useGetProfileById = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_PROFILE_ID),
            [Query.equal("user_id", userId)]
        );
        const documents = response.documents;

        return {
            id: documents[0]?.$id,
            user_id: documents[0]?.user_id,
            nick_name: documents[0]?.nick_name,
            user_name: documents[0]?.user_name,
            avatar: documents[0]?.image,
            bio: documents[0]?.bio,
            tick: documents[0]?.tick,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetProfileById;
