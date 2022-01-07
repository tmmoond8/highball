import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './hooks/useUserContext';
import RootStack from './RootStack';

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}
