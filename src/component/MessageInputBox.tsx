import * as React from 'react';
import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../Theme';

interface Props {
  channel: string;
}

interface State {}

export default class MessageInputBox extends React.Component<Props, State> {
  private textInput: TextInput | null = null;
  private message = '';

  constructor(props: Props) {
    super(props);
    this.state = { message: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          selectionColor={Color.orange}
          underlineColorAndroid={Color.orange}
          style={styles.messageInput}
          onChangeText={message => (this.message = message)}
          ref={_textInput => (this.textInput = _textInput)}
          placeholder={`${this.props.channel}に投稿する`}
        />
        <TouchableOpacity
          onPress={() => {
            Alert.alert('未実装', 'メッセージを送信する実装に置き換えてください');
          }}
          style={styles.buttonWrapper}
        >
          <Ionicons name="md-send" size={28} color={Color.darkGray} style={styles.submitButton} />
        </TouchableOpacity>
      </View>
    );
  }
}

interface Styles {
  container: ViewStyle;
  buttonWrapper: ViewStyle;
  submitButton: ViewStyle;
  messageInput: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    paddingHorizontal: 8,
    elevation: 4,
    height: 48,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  submitButton: {
    paddingHorizontal: 4,
  },
  messageInput: {
    paddingHorizontal: 4,
    flex: 1,
    textAlign: 'left',
    color: Color.darkGray,
  },
});
