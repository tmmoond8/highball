import React from 'react';
import {Pressable, Platform, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function IconButton({name, color, size = 24, onPress, _styles}) {
  const defaultColor = Platform.OS === 'ios' ? '#4E9AFE' : '#222';
  return (
    <View style={[_styles, styles.block]}>
      <Pressable
        style={({pressed}) => [
          styles.circle,
          Platform.OS === 'ios' &&
            pressed && {
              opacity: 0.3,
            },
          {
            width: size,
            height: size,
          },
        ]}
        onPress={onPress}
        android_ripple={{color: '#eee'}}>
        <Icon name={name} color={color ?? defaultColor} size={size} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    overflow: 'hidden',
    marginRight: 0,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
