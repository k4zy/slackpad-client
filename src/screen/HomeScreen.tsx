import * as React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import MessageLogList from '../component/MessageLogList';
import MessageInputBox from '../component/MessageInputBox';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
  channel?: string;
}

interface State {
  userName: string;
  channel?: string;
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
      this.state = { channel: '#genaral', userName };
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={75}
          behavior="position"
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <MessageLogList />
          <MessageInputBox navigation={this.props.navigation} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
