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
    const userName = params.userName;
    if (params && params.channel) {
      const channel: string = params.channel;
      this.state = { channel, userName };
    } else {
      this.state = { channel: 'general', userName };
    }
  }

  render() {
    const photo = this.props.navigation.state.params.photo;
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
