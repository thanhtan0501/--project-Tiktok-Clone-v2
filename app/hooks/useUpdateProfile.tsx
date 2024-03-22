import { database } from "@/libs/AppWriteClient";

const useUpdateProfile = async (
    id: string,
    user_name: string,
    nick_name: string,
    bio: string
) => {
    try {
        await database.updateDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_PROFILE_ID),
            id,
            {
                user_name: user_name,
                nick_name: nick_name,
                bio: bio,
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useUpdateProfile;
