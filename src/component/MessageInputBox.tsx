import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import { Camera, Permissions } from 'expo';
import CameraScreen from '../screen/CameraScreen';
import MessageRepo from '../repository/MessageRepo';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

export default class MessageInputBox extends React.Component<Props> {
  private message: string = '';

  render() {
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
          placeholder="#generalに投稿する"
        />
        <TouchableOpacity
          onPress={async () => {
            //Todo: ちゃんと引数を渡す
            await MessageRepo.post(this.message, '#genaral', 'kazy');
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
