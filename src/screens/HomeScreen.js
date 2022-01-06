import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SHEET_URL} from '@env';
import {colors} from '../styles';
import BottleList from '../components/BottleList';

const Slider = createMaterialTopTabNavigator();

const TYPES_OF_ALCOHOL = [
  {name: '버번 위스키', type: 'bourbonWhiskey'},
  {name: '진', type: 'gin'},
  {name: '보드카', type: 'vodka'},
  {name: '데낄라', type: 'tequila'},
  {name: '리큐르', type: 'liqueur'},
  {name: '럼', type: 'rum'},
  {name: ' 블렌디드  위스키', type: 'blendedWhiskey'},
  {name: ' 싱글 몰트 위스키', type: 'singleMaltWhiskey'},
  {name: ' 블렌디드  몰트 위스키', type: 'blendedMaltWhiskey'},
  {name: '브랜디', type: 'brandy'},
  {name: '사케', type: 'sake'},
  {name: '중국술', type: 'chinese'},
];

const renderBottleList = data =>
  Object.values(TYPES_OF_ALCOHOL).reduce((acc, {name, type}) => {
    acc[name] = () => (
      <BottleList
        data={data.filter(({category}) => category === type)}
        key={type}
      />
    );
    return acc;
  }, {});

export default function HomeScreen() {
  const [sheet, setSheet] = React.useState([]);
  // console.log('sheet', sheet);
  React.useEffect(() => {
    fetch(`${SHEET_URL}?sheetName=highball`)
      .then(r => r.json())
      .then(d => setSheet(d.data));
  }, []);
  return (
    <Slider.Navigator
      initialRouteName="whiskey"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarScrollEnabled: true,
        tabBarItemStyle: {width: 88},
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      {TYPES_OF_ALCOHOL.map(({name, type}, index) => (
        <Slider.Screen
          key={type}
          name={name}
          component={renderBottleList(sheet)[name]}
        />
      ))}
    </Slider.Navigator>
  );
}
