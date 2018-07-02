import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import DrawerComponent from './DrawerComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  header_text: {
    color: '#eee',
    fontWeight: 'bold',
    paddingLeft: 16,
    fontSize: 18,
  },
});

const headerView = () => {
  return (
    <View style={styles.header_container}>
      <TouchableHighlight
        onPress={() => {
          // props.navigation.toggleDrawer();
        }}
      >
        <Ionicons name="md-menu" size={28} color="#eee" />
      </TouchableHighlight>
      <Text style={styles.header_text}>#general</Text>
    </View>
  );
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: headerView,
    headerStyle: {
      backgroundColor: '#2d2d2d',
    },
    headerTintColor: '#fff',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen!!!</Text>
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
    Home: {
      screen: MainStackNavigator,
    },
  },
  { contentComponent: DrawerComponent },
);
