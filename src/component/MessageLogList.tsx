import * as React from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import MessageRow from './MessageRow';
import MessageRepo, { Message } from '../MessageRepo';

interface Props {}

interface State {
  messages: Message[];
}

export default class MessageLogList extends React.Component<Props, State> {
  private renderCell = ({ item }: { item: Message }) => {
    return <MessageRow message={item} />;
  };

  constructor(props: Props) {
    super(props);
    const messages = MessageRepo.fetch();
    this.state = {
      messages,
    };
  }
  render() {
    return (
      <FlatList
        style={styles.chat_list}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.select({ android: true, ios: false })}
        data={this.state.messages}
        renderItem={this.renderCell}
      />
    );
  }
}

const styles = StyleSheet.create({
  chat_list: {
    paddingHorizontal: 20,
  },
});
