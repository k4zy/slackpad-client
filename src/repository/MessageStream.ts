import { API_ENDPOINT } from './Endpoint';

class MessageStream {
  websocket: WebSocket;

  constructor() {
    this.websocket = new WebSocket(`ws://52.69.58.22/ws`);
    this.bindingEventCycle(this.websocket);
  }

  bindingEventCycle = (websocket: WebSocket) => {
    websocket.onopen = () => {
      console.log('ws:onOpened');
    };
    websocket.onmessage = e => {
      console.log(`ws:${e.data}`);
    };
    websocket.onerror = e => {
      console.error(e);
    };

    websocket.onclose = e => {
      // connection closed
      console.log('ws:onClosed');
    };
  };

  sendMessage = (channel: string, message: string) => {
    const data = `message ["${channel}","${message}"]`;
    console.log(`sendMessage: ${data}`);
    this.websocket.send(data);
  };

  join = (nickName: string) => {
    this.websocket.send(`user ["${nickName}"]`);
  };
}

export default new MessageStream();
