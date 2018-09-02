import { ENDPOINT_IP } from './Endpoint';
import { Message } from './MessageRepo';
import { format } from 'date-fns';

export interface StreamListener {
  onReceiveMessage?: (message: Message) => void;
  onReceiveReply?: (reply: Reply) => void;
  onError?: (error: Error) => void;
}

export interface Reply {
  prefix: string;
  command: string;
  params: string;
}

class MessageStream {
  websocket: WebSocket;
  listeners: StreamListener[] = [];

  constructor() {
    this.websocket = new WebSocket(`ws://${ENDPOINT_IP}/ws`);
    this.bindingEventCycle(this.websocket);
  }

  bindingEventCycle = (websocket: WebSocket) => {
    websocket.onopen = () => {};
    websocket.onmessage = e => {
      const reply = this.convertToReply(e);
      if (reply === null) {
        return;
      }
      switch (reply.command) {
        case 'message':
          this.handleMessageCommand(reply);
          break;
        case 'error':
          this.handleErrorCommand(reply);
          break;
        case 'user':
        case 'join':
        case 'part':
          this.handleGeneralCommand(reply);
          break;
      }
    };
    websocket.onerror = e => {};

    websocket.onclose = e => {};
  };

  private convertToReply = (event: any): Reply | null => {
    const data = event.data as string;
    const match = data.match(/\:(\w+)\s(\w+)\s(.+)/);
    if (match === null) {
      // throw new Error('Invalid format');
      return null;
    }
    const [_, prefix, command, params] = match;
    return { prefix, command, params };
  };

  private handleMessageCommand = (reply: Reply) => {
    //:olive message ["general","hello world!"]
    const match = reply.params.match(/\[\"(.+)\"\,\"(.+)\"\]/);
    if (match === null) {
      return;
    }
    const response: Message = {
      nickname: reply.prefix,
      message: match[2],
      created_at: format(new Date()),
    };
    this.listeners.forEach(listener => {
      if (listener.onReceiveMessage) {
        listener.onReceiveMessage(response);
      }
    });
  };

  private handleGeneralCommand = (reply: Reply) => {
    this.listeners.forEach(listener => {
      if (listener.onReceiveReply) {
        listener.onReceiveReply(reply);
      }
    });
  };

  private handleErrorCommand = (reply: Reply) => {
    //:slackpad error ["Duplicated nickname: kazy"]
    const match = reply.params.match(/\[\"(.+)\"\]/);
    if (match === null) {
      return;
    }
    this.listeners.forEach(listener => {
      if (listener.onError) {
        listener.onError(new Error(match[1]));
      }
    });
  };

  addListener = (listener: StreamListener) => {
    this.listeners.push(listener);
  };

  removeListener = (listener: StreamListener) => {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) this.listeners.splice(index, 1);
  };

  sendMessage = (channel: string, message: string) => {
    const data = `message ["${channel}", "${message}"]`;
    this.websocket.send(data);
  };

  join = (nickName: string) => {
    this.websocket.send(`user ["${nickName}"]`);
  };
}

export default new MessageStream();
