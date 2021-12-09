import React from 'react';
import {Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../components/ScreenLayout';

export default function DetailScreen({route}) {
  const navigation = useNavigation();
  return (
    <ScreenLayout>
      <Text>Detail {route.params.category}</Text>
      <Button title="Go Back" onPress={() => navigation.pop()} />
    </ScreenLayout>
  );
}
