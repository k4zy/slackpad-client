import ApiClient from './ApiClient';
import MessageStream from './MessageStream';
export interface Message {
  nickname: string;
  message: string;
  created_at: string;
}
export default class MessageRepo {
  static post = (channel: string, message: string): void => {
    MessageStream.sendMessage(channel, message);
  };

  static fetch = async (channelId: number, page = 0, perPage = 50): Promise<Message[]> => {
    const params = {
      page,
      per_page: perPage,
    };
    return await ApiClient.get<Message[]>(`/channels/${channelId}/messages`, params);
  };
}
