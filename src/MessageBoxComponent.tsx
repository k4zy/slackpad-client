import * as React from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {}

export default class MessageBoxComponent extends React.Component<Props> {
  render() {
    return (
      <View style={styles.message_box_container}>
        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
          <Ionicons name="md-camera" size={28} color="#2d2d2d" style={styles.action_icon} />
        </View>
        <TextInput style={styles.message_input_area} placeholder="Message for #general" />
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
    backgroundColor: '#eee',
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
