export interface Message {
    _id?: string;
    from: string;
    to: string;
    date?: string;
    body: string;
    conversationId: string;
    translatedBody?: string;
    shouldTranslate?: boolean;
}
