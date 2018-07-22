import * as React from 'react';
import { Alert, View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import CameraScreen from '../screen/CameraScreen';
import MessageRepo from '../repository/MessageRepo';
import { Photo } from '../repository/PhotoRepo';
import { API_ENDPOINT } from '../repository/Endpoint';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
  channel: string;
  photo?: Photo;
}

interface State {
  message: string;
}

export default class MessageInputBox extends React.Component<Props, State> {
  // private message: string = '';
  private textInput: TextInput | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { message: '' };
  }

  componentWillReceiveProps(props: Props) {
    if (props.photo) {
      const url = `${API_ENDPOINT}/images${props.photo.id}`;
      this.setState({
        message: `${this.state.message} 
      ${url}`,
      });
    }
  }

  render() {
    const params = this.props.navigation.state.params;
    const channelName = params.channelName ? params.channelName : '#general';
    return (
      <View style={styles.message_box_container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(CameraScreen.routeName);
          }}
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Ionicons name="md-camera" size={28} color="#2d2d2d" style={styles.action_icon} />
        </TouchableOpacity>
        <TextInput
          selectionColor="#FF9933"
          underlineColorAndroid="#FF9933"
          style={styles.message_input_area}
          onChangeText={message => this.setState({ message })}
          ref={_textInput => {
            this.textInput = _textInput;
          }}
          placeholder={`${channelName}に投稿する`}
          value={this.state.message}
        />
        <TouchableOpacity
          onPress={async () => {
            if (this.state.message.length === 0) {
              Alert.alert('バリデーションエラー', 'メッセージを入力して下さい');
              return;
            }
            MessageRepo.post(this.props.channel, this.state.message);
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
