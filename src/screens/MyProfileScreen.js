import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
// import IconRightButton from '../components/IconRightButton';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/userContext';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      title: user?.displayName ?? '',
      // headerRight: () => (
      //   <IconRightButton
      //     name="settings"
      //     onPress={() => navigation.push('Setting')}
      //   />
      // ),
    });
  }, [navigation, user]);
  console.log('user', user);

  return (
    <>
      {user && <Profile userId={user.id} />}
      {!user && <EmptyProfile />}
    </>
  );
}

function EmptyProfile() {
  const navigation = useNavigation();
  return (
    <View style={styles.empty}>
      <Text style={styles.emtpyTitle}>아직 회원이 아니신가요?</Text>
      <Button
        title="Sign In"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  emtpyTitle: {
    fontSize: 24,
    marginBottom: 24,
  },
});
