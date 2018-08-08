import * as React from 'react';
import {
  Alert,
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationRoute,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import HomeScreen from '../screen/HomeScreen';
import MessageStream, { Reply, StreamListener } from '../repository/MessageStream';
import { Color } from '../Theme';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

export default class LoginScreen extends React.Component<Props> {
  static routeName = '/LoginScreen';
  private nickname: string = '名無しさん';

  private streamListener: StreamListener = {
    onError: (error: Error) => {
      Alert.alert('Error Received', error.message);
    },
    onReceiveReply: (reply: Reply) => {
      if (reply.command === 'join') {
        const params = { userName: this.nickname };
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: HomeScreen.routeName, params })],
        });
        this.props.navigation.dispatch(resetAction);
      }
    },
  };

  componentDidMount() {
    MessageStream.addListener(this.streamListener);
  }

  componentWillUnmount() {
    MessageStream.removeListener(this.streamListener);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/cookpad.png')} />
        <Text style={styles.text}>SlackPadにようこそ!</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          selectionColor={Color.orange}
          onChangeText={text => {
            this.nickname = text;
          }}
          style={styles.textInput}
          placeholder="ハンドルネームを入力してくだいさい"
          autoCapitalize={'none'}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.buttonWrapper}
          activeOpacity={0.6}
          onPress={this.navigateHomeWithoutStack}
        >
          <Text style={styles.buttonText}>ログイン</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private navigateHomeWithoutStack = () => {
    MessageStream.join(this.nickname);
  };
}

interface Styles {
  container: ViewStyle;
  logo: ViewStyle;
  text: TextStyle;
  textInput: TextStyle;
  buttonWrapper: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 240,
    height: 240,
  },
  text: {
    fontSize: 28,
  },
  textInput: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: Color.darkGray,
    backgroundColor: Color.white,
  },
  buttonWrapper: {
    marginTop: 8,
    elevation: 4,
    width: '100%',
    borderRadius: 4,
    backgroundColor: Color.lightOrange,
  },
  buttonText: {
    paddingVertical: 8,
    width: '100%',
    color: Color.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
