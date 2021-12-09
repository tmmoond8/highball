import React from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

const Slider = createMaterialTopTabNavigator();

const categoris = [
  {name: '싱글 몰트 위스키', category: 'singleMaltWhiskey'},
  {name: '브랜디', category: 'brandy'},
  {name: '진', category: 'gin'},
  {name: '위스키', category: 'whiskey'},
  {name: '럼', category: 'rum'},
  // {name: '데낄라', category: 'tequila'},
  // {name: '보드카', category: 'vodka'},
  // {name: '리큐르', category: 'liqueur'},
  // {name: '블렌디드 몰트 위스키', category: 'blendedMaltWhiskey'},
  // {name: '사케', category: 'sake'},
  // {name: '블렌디드 위스키', category: 'blendedWhiskey'},
  // {name: '버번 위스키', category: 'bourbonWhiskey'},
  // {name: '중국술', category: 'chinese'},
];

export default function HomeScreen() {
  return (
    <Slider.Navigator initialRouteName="vodka">
      {categoris.map(({name, category}) => (
        <Slider.Screen
          key={category}
          name={name}
          component={() => <BottleList name={name} category={category} />}
        />
      ))}
    </Slider.Navigator>
  );
}

const BottleList = ({name, category}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>{name}</Text>
      <Button
        title="Go Detail"
        onPress={() => navigation.navigate('Detail', {category})}
      />
    </View>
  );
};
