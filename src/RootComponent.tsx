import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import DrawerComponent from './DrawerComponent';
import ChatListComponent from './ChatListComponent';
import MessageBoxComponent from './MessageBoxComponent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
      <View style={{ flex: 1 }}>
        <ChatListComponent />
        <MessageBoxComponent />
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
