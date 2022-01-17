import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import IconButton from '../components/IconButton';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/userContext';
import {useUiContext} from '../contexts/uiContext';
import {signOut} from '../libs/auth';

export default function MyProfileScreen() {
  const {user, setUser} = useUserContext();
  const navigation = useNavigation();
  const {modal} = useUiContext();

  const handleLogout = () => {
    signOut();
    setUser(null);
  };

  React.useEffect(() => {
    if (user) {
      navigation.setOptions({
        title: '',
        headerRight: () => (
          <IconButton
            color="#777"
            name="settings"
            onPress={() => {
              modal.open([
                {
                  icon: 'logout',
                  text: '로그아웃',
                  onPress: handleLogout,
                },
              ]);
            }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        title: '',
        headerRight: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, navigation, user]);

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
