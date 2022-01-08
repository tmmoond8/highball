import React from 'react';
import {Platform, View, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles';

export default function PostingButton() {
  return (
    <View style={styles.button}>
      <Pressable>
        <Icon name="add" color="white" size={32} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 32,
    bottom: 32,
    height: 54,
    width: 54,
    zIndex: 5,
    borderRadius: 27,
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
});
