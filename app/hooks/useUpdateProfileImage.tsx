import { database } from "@/libs/AppWriteClient";

const useUpdateProfileImage = async (id: string, image: string) => {
    try {
        await database.updateDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_PROFILE_ID),
            id,
            {
                image: image,
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useUpdateProfileImage;
