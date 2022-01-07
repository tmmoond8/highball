import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './contexts/userContext';
import RootStack from './screens/stacks/RootStack';

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}
