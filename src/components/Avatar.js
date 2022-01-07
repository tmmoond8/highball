import React from 'react';
import {Image} from 'react-native';
import {getImageUrl} from '../libs/utils';

export default function Avatar({source, size = 32, style}) {
  return (
    <Image
      source={getImageUrl(source)}
      resizeMode="cover"
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}
