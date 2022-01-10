import React from 'react';
import Profile from '../components/Profile';

export default function ProfileScreen({navigation, route}) {
  const params = route?.params;

  if (!params?.userId) {
    navigation.pop();
  }

  return <Profile userId={params?.userId} />;
}
