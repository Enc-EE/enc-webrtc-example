export default class ChatService {
    public messages: string[] = [];
    public received: (e: MessageEvent) => void = () => { };

    constructor(public dataChannel: RTCDataChannel) {
        this.dataChannel.addEventListener("message", this.receiveMessage)
    }

    sendMessage = (message: string) => {
        this.dataChannel.send(message);
        this.messages.push("me: " + message);
    }

    receiveMessage = (e: MessageEvent) => {
        this.messages.push("not me: " + e.data);
        this.received(e);
    }
}