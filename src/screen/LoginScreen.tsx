import * as React from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  Image,
  View,
  Button,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationRoute,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import HomeScreen from '../screen/HomeScreen';
import MessageStream from '../repository/MessageStream';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

export default class LoginScreen extends React.Component<Props> {
  static routeName = '/LoginScreen';
  private userName: string = '名無しさん';

  render() {
    return (
      <ScrollView style={styles.background}>
        <KeyboardAvoidingView keyboardVerticalOffset={75} behavior="position">
          <Image style={styles.image} source={require('../../assets/cookpad.png')} />
          <Text style={styles.title}>Slackpadにようこそ!</Text>
          <TextInput
            style={styles.input}
            selectionColor="#FF9933"
            underlineColorAndroid="#FF9933"
            placeholder="名前を入力して下さい"
            onChangeText={text => (this.userName = text)}
          />
          <Button title="ログイン" color="#FF9933" onPress={this.navigateHomeWithoutStack} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  private navigateHomeWithoutStack = () => {
    const params = { userName: this.userName };
    MessageStream.join(this.userName);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: HomeScreen.routeName, params })],
    });
    this.props.navigation.dispatch(resetAction);
  };
}

interface Styles {
  background: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  input: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  image: {
    alignSelf: 'center',
    width: 220,
    height: 220,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3d3a39',
  },
  input: {
    color: '#3d3a39',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 16,
  },
});
