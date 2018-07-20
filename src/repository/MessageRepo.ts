import ApiClient from './ApiClient';
export interface Message {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
}
export default class MessageRepo {
  static post = async (message: string, channel: string, userName: string): Promise<void> => {
    Promise.resolve();
  };

  static fetch = async (channelId: number, page = 0, perPage = 50): Promise<Message[]> => {
    const params = {
      page,
      per_page: perPage,
    };
    return await ApiClient.get<Message[]>(`/channels/${channelId}/messages`, params);
  };
}
