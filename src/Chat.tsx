import React from 'react';
import ChatService from './ChatService';
import './Chat.css';

export default class Chat extends React.Component<{ chatService: ChatService }, { message: string, messages: string[] }> {
    private key: number = 0;
    private messages: string[] = [];
    constructor(props: { chatService: ChatService }) {
        super(props);
        this.messages = this.props.chatService.messages;
        this.state = ({ message: "", messages: this.messages });
        this.props.chatService.received = this.receiveMessage;
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props != prevProps) {
            this.messages = this.props.chatService.messages;
            this.setState({ message: "", messages: this.messages });
        }
    }

    sendMessage = () => {
        this.props.chatService.sendMessage(this.state.message);
        this.setState({ message: "", messages: this.messages });
    }

    receiveMessage = (e: MessageEvent) => {
        this.setState({ message: "", messages: this.messages });
    }

    render() {
        return (
            <div className="chat">
                <div className="messages">{this.state.messages.map(x => <span className="message" key={this.key++}>{x}</span>)}</div>
                <textarea value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })}></textarea>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
}