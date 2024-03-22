import { Like } from "../types/types";

const useIsLike = (userId: string, postId: string, likes: Array<Like>) => {
    let res: Like[] = [];
    likes.forEach((like) => {
        if (like.user_id === userId && like.post_id === postId) {
            res.push(like);
        }
    });
    // const hasLikePost = likes.find(
    //     (like) => like.user_id === userId && like.post_id === postId
    // );
    if (typeof res === undefined) return false;
    return res.length > 0;
};

export default useIsLike;
