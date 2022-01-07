import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';
import * as Screens from '..';
import {useUserContext} from '../../contexts/userContext';
import {subscribeAuth} from '../../libs/auth';
import {getUser} from '../../libs/users';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const {user, setUser} = useUserContext();
  React.useEffect(() => {
    // 컴포넌트 첫 로딩 시 로그인 상태를 확인하고 UserContext에 적용
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);
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
