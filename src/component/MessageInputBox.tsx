import * as React from 'react';
import { Alert, View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
  channel: string;
}

interface State {
  message: string;
}

export default class MessageInputBox extends React.Component<Props, State> {
  private textInput: TextInput | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { message: '' };
  }

  render() {
    return (
      <View style={styles.message_box_container}>
        <TextInput
          selectionColor="#FF9933"
          underlineColorAndroid="#FF9933"
          style={styles.message_input_area}
          onChangeText={message => this.setState({ message })}
          ref={_textInput => (this.textInput = _textInput)}
          placeholder={`${this.props.channel}に投稿する`}
          value={this.state.message}
        />
        <TouchableOpacity
          onPress={() => {
            if (this.state.message.length === 0) {
              Alert.alert('バリデーションエラー', 'メッセージを入力して下さい');
              return;
            }
            Alert.alert('未実装', 'メッセージを送信する実装に置き換えてください');
            if (this.textInput) {
              this.textInput.clear();
              this.setState({ message: '' });
            }
            Keyboard.dismiss();
          }}
          style={{ justifyContent: 'center', alignContent: 'center' }}
        >
          <Ionicons name="md-send" size={28} color="#2d2d2d" style={styles.action_icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message_box_container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    elevation: 4,
    height: 50,
  },
  action_icon: {
    paddingHorizontal: 5,
  },
  message_input_area: {
    paddingHorizontal: 5,
    flex: 1,
    textAlign: 'left',
    color: '#a0a0a1',
  },
});
