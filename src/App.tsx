import * as React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import {
  NavigationScreenProp,
  NavigationRoute,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import DrawerView from './component/DrawerView';
import HeaderView from './component/HeaderView';
import CameraScreen from './screen/CameraScreen';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

const MainStackNavigator = createStackNavigator({
  [LoginScreen.routeName]: {
    screen: LoginScreen,
  },
  [HomeScreen.routeName]: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: { navigation: Navigation }) => ({
      headerTitle: HeaderView({
        navigation,
      }),
      headerStyle: {
        backgroundColor: '#2d2d2d',
      },
      headerTintColor: '#fff',
    }),
  },
  [CameraScreen.routeName]: { screen: CameraScreen },
});

const StackNavigator = createDrawerNavigator(
  {
    Home: {
      screen: MainStackNavigator,
    },
  },
  {
    contentComponent: DrawerView,
  },
);

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <StackNavigator />
      </KeyboardAvoidingView>
    );
  }
}
