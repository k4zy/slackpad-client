import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import DrawerView from './DrawerView';
import MessageLogList from './MessageLogList';
import MessageInputBox from './MessageInputBox';
import HeaderView from './HeaderView';
import CameraScreen from '../screen/CameraScreen';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

class HomeScreen extends React.Component<Props> {
  static routeName = '/RootComponent';
  static navigationOptions = {
    headerTitle: HeaderView,
    headerStyle: {
      backgroundColor: '#2d2d2d',
    },
    headerTintColor: '#fff',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MessageLogList />
        <MessageInputBox navigation={this.props.navigation} />
      </View>
    );
  }
}

const MainStackNavigator = createStackNavigator({
  [HomeScreen.routeName]: { screen: HomeScreen },
  [CameraScreen.routeName]: { screen: CameraScreen },
});

export default createDrawerNavigator(
  {
    Home: { screen: MainStackNavigator },
  },
  {
    contentComponent: DrawerView,
  },
);
