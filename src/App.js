import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './contexts/userContext';
import RootStack from './screens/stacks/RootStack';
import {UiContextProvider} from './contexts/uiContext';

export default function App() {
  return (
    <UiContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </UserContextProvider>
    </UiContextProvider>
  );
}
