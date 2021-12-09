import React from 'react';
import {View, Text, Button} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go Detail" onPress={() => navigation.navigate('Detail')} />
    </View>
  );
}
