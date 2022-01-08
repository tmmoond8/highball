import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Screens from '..';
import MyProfileStack from './MyProfileStack';
import ScreenLayout from '../../components/ScreenLayout';
import {colors} from '../../styles';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <ScreenLayout>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
        }}>
        <Tab.Screen
          name="Home"
          component={Screens.Home}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Screens.Search}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Timeline"
          component={Screens.Timeline}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="article" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cocktail"
          component={Screens.Cocktail}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="local-bar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MyProfileStack"
          component={MyProfileStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="account-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </ScreenLayout>
  );
}
