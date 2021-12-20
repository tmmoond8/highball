import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottleItem from './BottleItem';

const data = [
  {
    id: 1,
    title: '1776',
    price: 8500,
    description: 'description',
    imageUrl:
      'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
  },
  {
    id: 2,
    title: '노아스밀',
    price: 125000,
    description: 'description',
    imageUrl:
      'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
  },
  {
    id: 3,
    title: '놉크릭',
    price: 75000,
    description: 'description',
    imageUrl:
      'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
  },
  {
    id: 4,
    title: '메이커스 마크',
    price: 45000,
    description: 'description',
    imageUrl:
      'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
  },
  {
    id: 5,
    title: '버팔로 트레이스',
    price: 45000,
    description: 'description',
    imageUrl:
      'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
  },
  {
    id: 6,
    title: '와일드 터키',
    price: 47000,
    description: 'description',
    imageUrl:
      'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
  },
];

export default function BottleList() {
  const navigation = useNavigation();
  return (
    <FlatList
      style={styles.block}
      data={data}
      renderItem={bottle => (
        <BottleItem
          bottle={bottle.item}
          onPress={() => navigation.navigate('Detail', {id: bottle.id})}
        />
      )}
      keyExtractor={bottle => bottle.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  separator: {},
});
