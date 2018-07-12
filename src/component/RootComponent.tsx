import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import DrawerView from './DrawerView';
import MessageLogList from './MessageLogList';
import MessageInputBox from './MessageInputBox';
import HeaderView from './HeaderView';
import CameraScreen from '../screen/CameraScreen';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

class HomeScreen extends React.Component<Props> {
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

const MainStackNavigator = createStackNavigator({
  [HomeScreen.routeName]: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: { navigation: Navigation }) => ({
      headerTitle: HeaderView({
        onPress: () => {
          navigation.toggleDrawer();
        },
      }),
      headerStyle: {
        backgroundColor: '#2d2d2d',
      },
      headerTintColor: '#fff',
    }),
  },
  [CameraScreen.routeName]: { screen: CameraScreen },
});

export default createDrawerNavigator(
  {
    Home: {
      screen: MainStackNavigator,
    },
  },
  {
    contentComponent: DrawerView,
  },
);
