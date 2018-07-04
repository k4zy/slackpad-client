import * as React from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import MessageRowComponent from './MessageRowComponent';
import MessageRepo, { Message } from './MessageRepo';

interface Props {}

interface State {
  messages: Message[];
}

export default class ChatListComponent extends React.Component<Props, State> {
  private renderCell = ({ item }: { item: Message }) => {
    return <MessageRowComponent message={item} />;
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
        contentContainerStyle={{ paddingBottom: 50 }}
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
