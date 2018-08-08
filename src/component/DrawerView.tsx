import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  TouchableHighlight,
  ViewStyle,
  TextStyle,
} from 'react-native';
import ChannelRepo from '../repository/ChannelRepo';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import HomeScreen from '../screen/HomeScreen';
import Channel from '../model/Channel';
type Navigation = NavigationScreenProp<NavigationRoute<any>, any>;

interface Props {
  navigation: Navigation;
}

interface State {
  channels: Channel[];
}

export default class DrawerView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { channels: [] };
  }

  async componentDidMount() {
    const channels = await ChannelRepo.fetchChannels();
    this.setState({ channels });
  }

  render() {
    return (
      <View style={styles.root_container}>
        <View style={styles.workspace_container}>
          <Image style={{ width: 30, height: 30 }} source={require('../../assets/small.png')} />
          <Text style={styles.workspace_text}>cookpad workspace</Text>
        </View>
        <View style={styles.channel_container}>
          <Text style={styles.subheader_text}>CHANNELS</Text>
          <FlatList
            style={styles.channel_list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: Channel) => item.name}
            removeClippedSubviews={Platform.select({ android: true, ios: false })}
            data={this.state.channels}
            renderItem={this.renderCell}
          />
        </View>
      </View>
    );
  }

  private renderCell = ({ item }: { item: Channel }) => {
    return (
      <TouchableHighlight
        underlayColor="#62b5a5"
        onPress={() => {
          this.props.navigation.toggleDrawer();
          const params = { channel: item };
          this.props.navigation.navigate({ routeName: HomeScreen.routeName, params });
          console.log(item.name);
        }}
      >
        <Text style={styles.channel_name}>{item.name}</Text>
      </TouchableHighlight>
    );
  };
}

interface Styles {
  root_container: ViewStyle;
  workspace_container: ViewStyle;
  channel_container: ViewStyle;
  channel_list: ViewStyle;
  workspace_text: TextStyle;
  subheader_text: TextStyle;
  channel_name: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  root_container: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    paddingTop: 16,
  },
  workspace_container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    height: 64,
    flexDirection: 'row',
    backgroundColor: '#222222',
    paddingVertical: 10,
  },
  channel_container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#2d2d2d',
  },
  channel_list: {
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  workspace_text: {
    fontSize: 18,
    paddingLeft: 16,
    fontWeight: 'bold',
    color: '#fefefe',
  },
  subheader_text: {
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fefefe',
  },
  channel_name: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fefefe',
  },
});
