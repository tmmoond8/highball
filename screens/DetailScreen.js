import React from 'react';
import {Text, Button} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

export default function DetailScreen({navigation}) {
  return (
    <ScreenLayout>
      <Text>Detail</Text>
      <Button title="Go Back" onPress={() => navigation.pop()} />
    </ScreenLayout>
  );
}
