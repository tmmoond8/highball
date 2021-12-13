import React from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../styles';

const Slider = createMaterialTopTabNavigator();

const TYPES_OF_ALCOHOL = [
  {name: '버번 위스키', type: 'bourbonWhiskey'},
  {name: '진', type: 'gin'},
  {name: '보드카', type: 'vodka'},
  {name: '데낄라', type: 'tequila'},
  {name: '위스키', type: 'whiskey'},
  {name: '리큐르', type: 'liqueur'},
  {name: '럼', type: 'rum'},
  {name: ' 블렌디드  위스키', type: 'blendedWhiskey'},
  {name: ' 싱글 몰트 위스키', type: 'singleMaltWhiskey'},
  {name: ' 블렌디드  몰트 위스키', type: 'blendedMaltWhiskey'},
  {name: '브랜디', type: 'brandy'},
  {name: '사케', type: 'sake'},
  {name: '중국술', type: 'chinese'},
];

const renderBottleList = Object.values(TYPES_OF_ALCOHOL).reduce(
  (acc, {name, type}) => {
    acc[name] = () => <BottleList name={name} type={type} />;
    return acc;
  },
  {},
);

export default function HomeScreen() {
  return (
    <Slider.Navigator
      initialRouteName="whiskey"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 88},
        // tabBarActiveTintColor: colors.gray[990],
        // tabBarInactiveTintColor: colors.gray[700],
        tabBarIndicatorStyle: {
          borderBottomColor: 'red',
          borderColor: 'red',
          shadowColor: 'red',
          borderEndColor: 'red',
          backgroundColor: colors.primary,
        },
      }}>
      {TYPES_OF_ALCOHOL.map(({name, type}, index) => (
        <Slider.Screen
          key={type}
          name={name}
          component={renderBottleList[name]}
        />
      ))}
    </Slider.Navigator>
  );
}

const BottleList = ({name, type}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>{name}</Text>
      <Button
        title="Go Detail"
        onPress={() => navigation.navigate('Detail', {type})}
      />
    </View>
  );
};
