import * as React from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import MessageRow from './MessageRow';
import MessageRepo, { Message } from '../repository/MessageRepo';

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
        keyExtractor={(item: Message, index: number) => `${index}=${item.id}`}
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
