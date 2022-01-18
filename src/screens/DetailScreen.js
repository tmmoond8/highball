import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import {getImageUrl} from '../libs/utils';

export default function DetailScreen({route}) {
  const {
    photoURL,
    model,
    submodel,
    price,
    volume,
    age,
    description,
    date: dateString,
  } = route.params;
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <ScreenLayout>
      <View style={styles.block}>
        <View style={styles.row}>
          <Image
            source={{
              uri: getImageUrl(
                photoURL ||
                  'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912978/noticon/yuiz3tk8jejrbxz5ewp7.png',
              ),
            }}
            style={styles.image}
            resizeMethod="resize"
            resizeMode="cover"
          />
          <View style={styles.content}>
            <Text style={styles.title}>{`${model} ${submodel} ${age}`}</Text>
            <Text style={styles.volume}>{volume}</Text>
            <Text style={styles.price}>{`${price.toLocaleString()}원`}</Text>
            <Text style={styles.date}>마지막 가격 확인</Text>
            <Text>{`${year}년 ${month}월 ${day}일`}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: '60%',
    aspectRatio: 1,
    marginBottom: 16,
    marginRight: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
    marginTop: 4,
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
  date: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    lineHeight: 24,
    fontSize: 16,
    marginTop: 20,
  },
});
