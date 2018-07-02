import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
export default () => {
  return (
    <View style={styles.root_container}>
      <View style={styles.workspace_container}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri:
              'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2016-04-13/34302871409_9799185b8d4e529cb8c4_132.png',
          }}
        />
        <Text style={styles.workspace_text}>cookpad workspace</Text>
      </View>
      <View style={styles.channel_container}>
        <Text style={styles.subheader_text}>Channels</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
  },
  workspace_text: {
    fontSize: 18,
    paddingLeft: 16,
    fontWeight: 'bold',
    color: '#fefefe',
  },
  subheader_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fefefe',
  },
});
