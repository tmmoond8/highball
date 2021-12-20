import React from 'react';
import {Pressable, Text, Image, StyleSheet, View} from 'react-native';

const BottleItem = ({bottle, onPress}) => {
  const {model, submodel, age, price, volume, date, where, etc} = bottle;
  return (
    <Pressable style={styles.block} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{`${model} ${submodel} ${age}`}</Text>
        <Text
          style={styles.price}>{`${price.toLocaleString()}원 ${volume}`}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#37474f',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 21,
    marginTop: 12,
  },
  description: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

export default BottleItem;

function truncate(text) {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace(/\n/g, ' ');
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
}
