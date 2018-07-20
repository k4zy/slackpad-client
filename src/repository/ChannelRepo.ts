import { API_ENDPOINT } from './Endpoint';
import { Channel } from './ChannelRepo';
import ApiClient from './ApiClient';

export interface Channel {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default class ChannelRepo {
  static fetchChannels = async (): Promise<Channel[]> => {
    return await ApiClient.get<Channel[]>('channels');
  };
}
