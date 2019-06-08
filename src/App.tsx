import React from 'react';
import './App.css';
import HowTo from './HowTo';
import Chats from './Chats';
import ChatService from './ChatService';

export default class App extends React.Component<{}, { chats: ChatService[] }> {
  private chats: ChatService[] = [];
  constructor(props: {}) {
    super(props);
    this.state = { chats: this.chats };
  }

  onDataChannel = (e: RTCDataChannel) => {
    this.chats.push(new ChatService(e));
    this.setState({ chats: this.chats });
  }

  render() {
    return (
      <div className="app">
        <h1>Enc Web RTC</h1>
        <HowTo onDataChannel={this.onDataChannel}></HowTo>
        <Chats chats={this.state.chats}></Chats>
      </div>
    );
  }
}