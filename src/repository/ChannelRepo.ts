import Channel from '../model/Channel';
import ApiClient from './ApiClient';

export default class ChannelRepo {
  static fetchChannels = async (): Promise<Channel[]> => {
    return await ApiClient.get<Channel[]>('channels');
  };
}
