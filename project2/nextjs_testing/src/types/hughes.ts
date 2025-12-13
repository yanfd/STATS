export interface Message {
    id: number;
    date: string;
    title: string;
    content: string;
    timestamp: string;
    year?: number;
    month?: number;
    day?: number;
}

export interface MessageGroup {
    year: number;
    month: number;
    messages: Message[];
}
