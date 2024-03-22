import { database, ID } from "@/libs/AppWriteClient";

const useCreateProfile = async (
    userId: string,
    name: string,
    user_name: string,
    avatar: string,
    bio: string,
    tick?: boolean
) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_APP_WRITE_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_APP_WRITE_COLLECTION_PROFILE_ID),
            ID.unique(),
            {
                user_id: userId,
                nick_name: name,
                user_name: user_name,
                image: avatar,
                bio: bio,
                tick: tick,
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default useCreateProfile;
