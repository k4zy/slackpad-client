export interface Channel {
  name: string;
}

export default class ChannelRepo {
  // Todo: APIリクエストに切り替える
  static fetch = async (): Promise<Channel[]> => {
    return Promise.resolve([
      { name: '#genaral' },
      { name: '#public' },
      { name: '#typescript' },
      { name: '#tech' },
      { name: '#random' },
    ]);
  };
}
