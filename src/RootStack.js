import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as Screens from './screens';
import {useUserContext} from './hooks/useUserContext';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const {user} = useUserContext();
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Screens.Main}
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
