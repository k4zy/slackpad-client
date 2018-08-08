import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NameIcon from './NameIcon';
import Message from '../model/Message';
import { format, parse } from 'date-fns';

interface Props {
  message: Message;
}

export default (props: Props) => {
  return (
    <View style={styles.root_container}>
      <NameIcon nickname={props.message.nickname} />
      <View style={styles.right_container}>
        <View style={styles.status_container}>
          <Text style={styles.user_name}>{props.message.nickname}</Text>
          <Text style={styles.posted_at}>{format(parse(props.message.created_at), 'HH:mm')}</Text>
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
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15,
  },
  status_container: {
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
