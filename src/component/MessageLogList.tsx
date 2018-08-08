import * as React from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import MessageRow from './MessageRow';
import MessageRepo, { Message } from '../repository/MessageRepo';
import MessageStream, { StreamListener } from '../repository/MessageStream';
import Channel from '../model/Channel';

interface Props {
  channel: Channel;
}

interface State {
  messages: Message[];
}

export default class MessageLogList extends React.Component<Props, State> {
  private renderCell = ({ item }: { item: Message }) => {
    return <MessageRow message={item} />;
  };

  private streamListener: StreamListener = {
    onReceiveMessage: message => {
      this.setState({ messages: [message, ...this.state.messages] });
    },
  };

  constructor(props: Props) {
    super(props);
    this.fetch();
    this.state = { messages: [] };
  }

  componentDidMount() {
    MessageStream.addListener(this.streamListener);
  }

  componentWillMount() {
    MessageStream.removeListener(this.streamListener);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.channel.id !== this.props.channel.id) {
      this.fetch();
    }
  }

  async fetch() {
    console.log(`request_id: ${this.props.channel.id}`);
    const messages = await MessageRepo.fetch(this.props.channel.id);
    this.setState({ messages });
  }

  render() {
    return (
      <FlatList
        style={styles.chat_list}
        keyExtractor={(item: Message, index: number) => `${index}=${item.message}`}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.select({ android: true, ios: false })}
        inverted={true}
        data={this.state.messages}
        renderItem={this.renderCell}
      />
    );
  }
}

const styles = StyleSheet.create({
  chat_list: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});
