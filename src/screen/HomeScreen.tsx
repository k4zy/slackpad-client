import * as React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import MessageLogList from '../component/MessageLogList';
import MessageInputBox from '../component/MessageInputBox';
import { Photo } from '../repository/PhotoRepo';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
  channel?: string;
}

interface State {
  userName: string;
  channel: string;
}

export default class HomeScreen extends React.Component<Props, State> {
  static routeName = '/HomeScreen';

  constructor(props: Props) {
    super(props);
    const params = props.navigation.state.params;
    const userName = params && params.userName ? params.userName : 'kazy';
    if (params && params.channel) {
      const channel: string = params.channel;
      this.state = { channel, userName };
    } else {
      this.state = { channel: 'general', userName };
    }
  }

  render() {
    const params = this.props.navigation.state.params;
    const photo = params && params.photo ? params.photo : undefined;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={75}
          behavior="position"
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <MessageLogList />
          <MessageInputBox
            photo={photo}
            channel={this.state.channel}
            navigation={this.props.navigation}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
