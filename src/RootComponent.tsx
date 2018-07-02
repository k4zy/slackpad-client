import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const MainStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

export default createDrawerNavigator({
  Home: {
    screen: MainStackNavigator,
  },
});
