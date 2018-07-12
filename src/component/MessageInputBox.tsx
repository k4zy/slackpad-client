import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import { Camera, Permissions } from 'expo';
import CameraScreen from '../screen/CameraScreen';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute<any>, any>;
}

export default class MessageInputBox extends React.Component<Props> {
  render() {
    return (
      <View style={styles.message_box_container}>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate(CameraScreen.routeName);
          }}
          style={{ justifyContent: 'center', alignContent: 'center' }}
        >
          <Ionicons name="md-camera" size={28} color="#2d2d2d" style={styles.action_icon} />
        </TouchableHighlight>
        <TextInput
          selectionColor="#FF9933"
          underlineColorAndroid="#FF9933"
          style={styles.message_input_area}
          placeholder="#generalに投稿する"
        />
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
          <Ionicons name="md-send" size={28} color="#2d2d2d" style={styles.action_icon} />
        </View>
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
