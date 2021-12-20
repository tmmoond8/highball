import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottleItem from './BottleItem';

export default function BottleList(props) {
  const navigation = useNavigation();
  return (
    <FlatList
      style={styles.block}
      data={props.data}
      renderItem={bottle => (
        <BottleItem
          bottle={bottle.item}
          onPress={() => navigation.navigate('Detail', {id: bottle.item.id})}
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
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});
