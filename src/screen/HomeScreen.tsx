import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import MessageLogList from '../component/MessageLogList';
import MessageInputBox from '../component/MessageInputBox';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

export default class HomeScreen extends React.Component<Props> {
  static routeName = '/RootComponent';
  static navigationOptions = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MessageLogList />
        <MessageInputBox navigation={this.props.navigation} />
      </View>
    );
  }
}
