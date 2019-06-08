import React from 'react';
import Chat from './Chat';
import ChatService from './ChatService';
import './Chats.css';

export default class Chats extends React.Component<{ chats: ChatService[] }, { chats: ChatService[], activeChat: ChatService | undefined }> {
    private key: number = 0;

    constructor(props: { chats: ChatService[] }) {
        super(props);
        this.state = ({ chats: this.props.chats, activeChat: undefined });
    }

    onClickChat = (chat: ChatService) => {
        console.log(chat);

        this.setState({ activeChat: chat });
    }

    render() {
        return (
            <div className="chats">
                <div className="chats-nav">
                    {this.state.chats.map((x, i) =>
                        <h2 className="chat-nav" key={this.key++} onClick={e => this.onClickChat(x)}>
                            {(i + 1)}
                        </h2>)}
                </div>
                {this.state.activeChat ? <Chat chatService={this.state.activeChat}></Chat> : <div></div>}
            </div>
        );
    }
}