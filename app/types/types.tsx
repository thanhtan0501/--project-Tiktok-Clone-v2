export interface UserContextTypes {
    user: UserType | null;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

export interface UserType {
    id: string;
    user_id: string;
    user_name: string;
    nick_name: string;
    tick?: boolean;
    bio?: string;
    avatar: string;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}
export interface Profile {
    id: string;
    user_id: string;
    nick_name: string;
    user_name: string;
    bio: string;
    avatar: string;
    tick?: boolean;
}
export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        nick_name: string;
        user_name: string;
        avatar: string;
        tick?: boolean;
    };
}
export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}
export interface CommentWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        nick_name: string;
        user_name: string;
        avatar: string;
        tick?: boolean;
    };
}
