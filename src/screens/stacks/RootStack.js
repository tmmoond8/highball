import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';
import * as Screens from '..';
import {useUserContext} from '../../contexts/userContext';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const {user} = useUserContext();
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Screens.Detail}
        options={{
          headerShown: false,
        }}
      />
      {!user && (
        <Stack.Screen
          name="SignIn"
          component={Screens.SignIn}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}
