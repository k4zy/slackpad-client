import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Message } from '../repository/MessageRepo';
const moment = require('moment');

interface Props {
  message: Message;
}

export default (props: Props) => {
  return (
    <View style={styles.root_container}>
      <View style={{ justifyContent: 'center' }}>
        <Image
          borderRadius={3}
          style={styles.user_icon}
          //TODO fix URL
          source={require('../../assets/avatar.jpg')}
        />
      </View>
      <View style={styles.right_container}>
        <View style={styles.status_container}>
          <Text style={styles.user_name}>{props.message.nickname}</Text>
          <Text style={styles.posted_at}>{moment(props.message.created_at).format('LT')}</Text>
        </View>
        <Text>{props.message.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root_container: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  right_container: {
    paddingLeft: 15,
    // flex: 1,
    // flexDirection: 'column',
  },
  status_container: {
    // flex: 1,
    flexDirection: 'row',
  },

  user_icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    width: 30,
    height: 30,
  },
  user_name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  posted_at: {
    paddingTop: 2,
    paddingLeft: 6,
    color: '#9d9d9e',
  },
});
