import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import MainTabStack from './MainTabStack';
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
      SplashScreen.hide();
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
        name="MainTab"
        component={MainTabStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Screens.Detail}
        options={{
          title: '',
          headerBackTitle: '뒤로가기',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Screens.Profile}
        options={{
          title: '사용자 프로필',
          headerBackTitle: '뒤로가기',
        }}
      />
      {user && (
        <Stack.Screen
          name="Edit"
          component={Screens.Edit}
          options={{
            title: '새 게시물 작성',
            headerBackTitle: '뒤로가기',
          }}
        />
      )}
      {!user && (
        <Stack.Screen
          name="SignIn"
          component={Screens.SignIn}
          options={{
            title: 'Sign In',
            headerBackTitle: '뒤로가기',
          }}
        />
      )}
    </Stack.Navigator>
  );
}
