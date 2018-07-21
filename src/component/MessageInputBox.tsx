import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import { Camera, Permissions } from 'expo';
import CameraScreen from '../screen/CameraScreen';
import MessageRepo from '../repository/MessageRepo';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
  channel: string;
}

export default class MessageInputBox extends React.Component<Props> {
  private message: string = '';
  private textInput: TextInput | null = null;

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
          onChangeText={text => (this.message = text)}
          ref={_textInput => {
            this.textInput = _textInput;
          }}
          placeholder={`${channelName}に投稿する`}
        />
        <TouchableOpacity
          onPress={async () => {
            MessageRepo.post(this.props.channel, this.message);
            if (this.textInput) {
              this.textInput.clear();
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
