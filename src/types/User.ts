export interface User {
    _id: string;
    username?: string;
    fullName: string;
    language: string;
    avatar: string;
}
export interface UserProfile {
    fullName?: string;
    city?: string;
    phone?: string;
    avatar?: string;
    describe?: string;
    language?: string;
}
