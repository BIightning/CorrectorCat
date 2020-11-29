export class FeedbackMessage {
    duration: number;
    message: string;
    bShow: boolean;
    messageType: MessageType;

    constructor(message?: string, type?: MessageType, duration?: number, bShow?: boolean){
        this.duration = duration || 2000;
        this.message = message || "";
        this.bShow = bShow || false;
        this.messageType = type || MessageType.Info;
    }

    
}

export enum MessageType {
    Error = 3,
    Warning = 2,
    Success = 1,
    Info = 0
}
