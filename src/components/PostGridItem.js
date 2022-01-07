import React from 'react';
import {useWindowDimensions, Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImageUrl} from '../libs/utils';

export default function PostGridItem({post}) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Post', {post});
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [
        styles.block,
        {
          opacity: pressed ? 0.6 : 1,
          width: size,
          height: size,
        },
      ]}>
      <Image
        style={[
          styles.image,
          {
            width: size,
            height: size,
          },
        ]}
        source={{uri: getImageUrl(post.photoURL)}}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    margin: 0.5,
  },
  image: {
    backgroundColor: '#bdbdbd',
  },
});
