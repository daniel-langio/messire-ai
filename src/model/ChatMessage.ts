export interface ChatMessageType {
    id: string;
    authorName: string;
    content: string;
}

export class ChatMessage implements ChatMessageType {
    id: string;
    authorName: string;
    content: string;

    constructor(id: string, authorName: string, content: string) {
        this.id = id;
        this.authorName = authorName;
        this.content = content;
    }

}