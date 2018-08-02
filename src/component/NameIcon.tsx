import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export default (props: { nickname: string }) => {
  const initial = props.nickname.substring(0, 1).toLocaleLowerCase();
  return (
    <View style={styles.container}>
      <View style={styles.flexWrapper}>
        <Text style={styles.iconStyle}>{initial}</Text>
      </View>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  flexWrapper: ViewStyle;
  iconStyle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: 40,
    height: 40,
    borderRadius: 6,
    alignContent: 'center',
    backgroundColor: '#474745',
  },
  flexWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#eee',
  },
});
