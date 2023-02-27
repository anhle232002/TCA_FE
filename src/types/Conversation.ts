import { Message } from "./Message";
import { User } from "./User";

export interface Conversation {
    members: any[];
    date: string;
    lastMessage: {};
    _id: string;
}

export interface IConversation {
    user: User;
    conversation: Conversation | null;
    messages: Message[] | null;
}
