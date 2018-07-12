import * as React from 'react';
import {
  TextInput,
  Text,
  Image,
  View,
  Button,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

export default class LoginScreen extends React.Component<Props> {
  static routeName = '/LoginScreen';
  static navigationOptions = {};

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.image} source={require('../../assets/cookpad.png')} />
        <Text style={styles.title}>Slackpadにようこそ!</Text>
        <TextInput
          style={styles.input}
          selectionColor="#FF9933"
          underlineColorAndroid="#FF9933"
          placeholder="名前を入力して下さい"
        />
        <Button title="ログイン" color="#FF9933" onPress={() => {}} />
      </View>
    );
  }
}

interface Styles {
  background: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  input: TextStyle;

  // modal: ViewStyle;
  // modalMessage: TextStyle;
  // recipeDetails: ViewStyle;
  // imageWrapper: ViewStyle;
  // recipeTitle: TextStyle;
  // buttonRow: ViewStyle;
  // buttonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    paddingTop: 50,
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
