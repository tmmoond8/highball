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
        <View style={styles.description}>
          <Text style={styles.price}>{`${price.toLocaleString()}원`}</Text>
          <Text style={styles.volume}>{volume}</Text>
          <View />
        </View>
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
    flex: 1,
    justifyContent: 'flex-start',
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
  volume: {
    color: '#263323',
    marginTop: 10,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
