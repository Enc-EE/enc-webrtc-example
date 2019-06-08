import React from 'react';
import './HowTo.css';
import { WebRtcConnector } from "enc-webrtc";

class HowTo extends React.Component<{ onDataChannel: (e: RTCDataChannel) => void }, { client1Id: string, client2Id: string, isStarted: boolean }> {
  private webRtcConnector: WebRtcConnector;
  constructor(props: any) {
    super(props);
    this.state = {
      client1Id: "",
      client2Id: "",
      isStarted: false
    };
    this.webRtcConnector = new WebRtcConnector("https://enc-webrtc-signaling-app.azurewebsites.net");
    this.webRtcConnector.receivedNegotiatedConnection.addEventListener((rtc) => {
      var dataChannel = rtc.createDataChannel("data");
      this.props.onDataChannel(dataChannel);
    });
  }

  startListen = async () => {
    var client1Id = await this.webRtcConnector.createListener();
    this.webRtcConnector.startListener();
    this.setState({
      client1Id: client1Id,
      isStarted: this.webRtcConnector.isStarted
    })
  }

  stopListen = () => {
    this.webRtcConnector.stopListener();
    this.setState({
      isStarted: this.webRtcConnector.isStarted
    })
  }

  join = async () => {
    if (this.state.client2Id) {
      var rtc = await this.webRtcConnector.connect(this.state.client2Id)
      rtc.addEventListener("datachannel", (dc) => {
        console.log("hi there");
        this.props.onDataChannel(dc.channel);
        // createChat(dc.channel);
      });
    } else {
      console.log("id missing");
    }
  }

  createChat = (dataChannel: RTCDataChannel) => {
    // new Chat(currentId, dataChannel);
    // currentId++;
  }

  render() {
    return (
      <div className="howTo">
        <div className="client1Div">
          <div className="client1Buttons">
            <button onClick={this.startListen}>Start Listen</button>
            <button onClick={this.stopListen}>Stop Listen</button>
          </div>
          {this.state.isStarted ?
            <p>Listening: {this.state.client1Id}</p> :
            <p>Not Listening.</p>}
        </div>
        <div className="client2Div">
          <input type="text" size={5} value={this.state.client2Id} onChange={(e) => this.setState({ client2Id: e.target.value })} />
          <button onClick={this.join}>Connect</button>
        </div>
      </div>
    );
  }
}

export default HowTo;
