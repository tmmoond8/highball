import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
// import IconRightButton from '../components/IconRightButton';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/userContext';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  console.log('user', user);
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      // title: user.displayName,
      // headerRight: () => (
      //   <IconRightButton
      //     name="settings"
      //     onPress={() => navigation.push('Setting')}
      //   />
      // ),
    });
  }, [navigation, user]);

  return <Text>{/* <Profile userId={user.id} /> */}</Text>;
}
