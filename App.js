import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Screens from './screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Screens.Home}
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Screens.Search}
          options={{
            title: '검색',
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Timeline"
          component={Screens.Timeline}
          options={{
            title: '타임라인',
            tabBarIcon: ({color, size}) => (
              <Icon name="article" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cocktail"
          component={Screens.Cocktail}
          options={{
            title: '칵테일',
            tabBarIcon: ({color, size}) => (
              <Icon name="local-bar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
