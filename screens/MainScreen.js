import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import TimelineScreen from './TimelineScreen';
import CocktailScreen from './CocktailScreen';
import ScreenLayout from '../components/ScreenLayout';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <ScreenLayout>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="article" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cocktail"
          component={CocktailScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="local-bar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </ScreenLayout>
  );
}
