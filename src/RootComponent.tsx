import * as React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

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
      <Image
        style={{ width: 30, height: 30 }}
        source={{
          uri:
            'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2016-04-13/34302871409_9799185b8d4e529cb8c4_132.png',
        }}
      />
      <Text style={styles.header_text}>Cookpad</Text>
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
