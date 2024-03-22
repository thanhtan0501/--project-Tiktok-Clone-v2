import { Query, database } from "@/libs/AppWriteClient";

const useSearchByName = async (nick_name: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_PROFILE_ID),
            [Query.limit(5), Query.search("nick_name", nick_name)]
        );
        const documents = response.documents;

        const data = documents.map((item) => ({
            id: item?.$id,
            user_id: item?.user_id,
            nick_name: item?.nick_name,
            user_name: item?.user_name,
            avatar: item?.image,
            tick: item?.tick,
        }));

        const result = await Promise.all(data);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useSearchByName;
