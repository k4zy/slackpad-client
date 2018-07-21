import { API_ENDPOINT } from './Endpoint';
import { Message } from './MessageRepo';
import { format, parse } from 'date-fns';

interface StreamListener {
  onMessage: (message: Message) => void;
}

interface Reply {
  prefix: string;
  command: string;
  params: string;
}

class MessageStream {
  websocket: WebSocket;
  listeners: StreamListener[] = [];

  constructor() {
    this.websocket = new WebSocket(`ws://52.69.58.22/ws`);
    this.bindingEventCycle(this.websocket);
  }

  bindingEventCycle = (websocket: WebSocket) => {
    websocket.onopen = () => {
      console.log('ws:onOpened');
    };
    websocket.onmessage = e => {
      const reply = this.convertToReply(e);
      if (reply === null) {
        return;
      }
      switch (reply.command) {
        case 'message':
          this.handleMessageCommand(reply);
          break;
      }
    };
    websocket.onerror = e => {
      console.log(`ws:onError: ${e.returnValue}`);
    };

    websocket.onclose = e => {
      console.log('ws:onClosed');
    };
  };

  private convertToReply(event: any): Reply | null {
    console.log(`ws:${event.data}`);
    const data = event.data as string;
    const match = data.match(/\:(\w+)\s(\w+)\s(.+)/);
    if (match === null) {
      // throw new Error('Invalid format');
      return null;
    }
    const [_, prefix, command, params] = match;
    return { prefix, command, params };
  }

  private handleMessageCommand(reply: Reply) {
    const match = reply.params.match(/\[\"(\w+)\"\,\"(.+)\"\]/);
    if (match === null) {
      return;
    }
    const response: Message = {
      nickname: reply.prefix,
      message: match[2],
      created_at: format(new Date()),
    };
    this.listeners.forEach(listener => {
      listener.onMessage(response);
    });
  }

  addListener(listener: StreamListener) {
    this.listeners.push(listener);
  }

  clearListener() {
    this.listeners.length = 0;
  }

  sendMessage = (channel: string, message: string) => {
    const data = `message ["${channel}", "${message}"]`;
    console.log(`sendMessage: ${data}`);
    this.websocket.send(data);
  };

  join = (nickName: string) => {
    this.websocket.send(`user ["${nickName}"]`);
  };
}

export default new MessageStream();
