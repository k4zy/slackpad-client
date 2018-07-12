import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import MessageLogList from '../component/MessageLogList';
import MessageInputBox from '../component/MessageInputBox';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

interface State {
  userName: string;
}

export default class HomeScreen extends React.Component<Props, State> {
  static routeName = '/HomeScreen';
  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    const userName = props.navigation.state.params.userName;
    console.log(userName);
    this.state = { userName };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MessageLogList />
        <MessageInputBox navigation={this.props.navigation} />
      </View>
    );
  }
}
