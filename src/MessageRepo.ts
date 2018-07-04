import sample from 'lodash.sample';
export interface Message {
  id: number;
  plainText: string;
  userIcon: string;
  userName: string;
  postedAt: string;
}
export default class MessageRepo {
  static fetch = () => {
    return MessageRepo.generateDummyData(100);
  };

  static kazyDummy = {
    id: 1,
    plainText: 'わいわい! いいですね',
    userIcon: 'https://avatars3.githubusercontent.com/u/1908396',
    userName: 'kazy',
    postedAt: '2018-11-11 10:12:26',
  };

  static gfxDummy = {
    id: 2,
    plainText: 'Circle CI ってVMのメモリ増やせないのかな…。',
    userIcon: 'https://avatars3.githubusercontent.com/u/101800',
    userName: 'gfx',
    postedAt: '2018-11-11 10:14:00',
  };

  static kokubunDummy = {
    id: 3,
    plainText: '古いRubyインストールしようとすると大体opensslで破滅して辛い',
    userIcon: 'https://avatars0.githubusercontent.com/u/3138447',
    userName: 'kokubun',
    postedAt: '2018-11-11 10:15:26',
  };

  static generateDummyData = (size: number): Message[] => {
    const dummyList = [MessageRepo.kazyDummy, MessageRepo.gfxDummy, MessageRepo.kokubunDummy];
    return Array.from(new Array(size), (val, index) => index).map(index => {
      const message = sample(dummyList);
      message.id = index;
      return message;
    });
  };
}
