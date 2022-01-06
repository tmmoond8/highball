import React from 'react';
import {Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CocktailScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Cocktail Screen</Text>
      <Button
        title="sign in"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
    </View>
  );
}
