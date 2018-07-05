import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import DrawerView from './DrawerView';
import MessageLogList from './MessageLogList';
import MessageInputBox from './MessageInputBox';
import HeaderView from './HeaderView';

class HomeScreen extends React.Component {
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
        <MessageInputBox />
      </View>
    );
  }
}

const MainStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default createDrawerNavigator(
  {
    Home: { screen: MainStackNavigator },
  },
  {
    contentComponent: DrawerView,
  },
);
