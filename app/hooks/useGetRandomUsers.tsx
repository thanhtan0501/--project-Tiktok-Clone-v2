import { database, Query } from "@/libs/AppWriteClient";

const useGetRandomUsers = async () => {
    try {
        const result = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_PROFILE_ID),
            [Query.limit(5)]
        );
        const documents = result.documents;
        const data = documents.map((item) => ({
            id: item?.$id,
            user_id: item?.user_id,
            nick_name: item?.nick_name,
            user_name: item?.user_name,
            avatar: item?.image,
            tick: item?.tick,
        }));

        const newData = await Promise.all(data);

        return newData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useGetRandomUsers;
