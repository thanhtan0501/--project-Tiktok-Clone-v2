import { database } from "@/libs/AppWriteClient";

const useDeleteLike = async (id: string) => {
    try {
        await database.deleteDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_LIKE_ID),
            id
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useDeleteLike;
