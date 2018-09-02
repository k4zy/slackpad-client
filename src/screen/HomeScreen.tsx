import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import Channel from '../model/Channel';
import MessageLogList from '../component/MessageLogList';
import MessageInputBoxWithCamera from '../component/MessageInputBoxWithCamera';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
  channel?: Channel;
}

interface State {
  userName: string;
  channel: Channel;
}

export default class HomeScreen extends React.Component<Props, State> {
  static routeName = '/HomeScreen';

  constructor(props: Props) {
    super(props);
    const params = props.navigation.state.params;
    const userName = params && params.userName ? params.userName : 'kazy';
    if (params && params.channel) {
      const channel = params.channel;
      this.state = { channel, userName };
    } else {
      this.state = { channel: { id: 101, name: 'general' }, userName };
    }
  }

  render() {
    const params = this.props.navigation.state.params;
    const photo = params && params.photo ? params.photo : undefined;
    const channel = params && params.channel ? params.channel : this.state.channel;
    return (
      <View style={{ flex: 1 }}>
        <MessageLogList channel={channel} />
        <MessageInputBoxWithCamera
          photo={photo}
          channel={channel}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
