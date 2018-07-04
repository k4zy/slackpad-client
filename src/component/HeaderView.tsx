import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default () => {
  return (
    <View style={styles.header_container}>
      <TouchableHighlight
        onPress={() => {
          // props.navigation.toggleDrawer();
        }}
      >
        <Ionicons name="md-menu" size={28} color="#eee" />
      </TouchableHighlight>
      <Text style={styles.header_text}>#general</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  header_text: {
    color: '#eee',
    fontWeight: 'bold',
    paddingLeft: 16,
    fontSize: 18,
  },
});
