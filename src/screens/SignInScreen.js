import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {FIREBASE_WEB_CLIENT_ID} from '@env';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SignIn} from '../libs/auth';
import {useUserContext} from '../contexts/userContext';
import {getUser, createUser} from '../libs/users';

export default function SignInScreen() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const {setUser} = useUserContext();
  const handleSignIn = async () => {
    try {
      setIsProcessing(true);
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const {user} = await SignIn(idToken);
      const currentUser = await getUser(user.uid);
      if (!currentUser) {
        await createUser({
          id: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      setUser(
        currentUser ?? {
          ...user,
          id: user.uid,
        },
      );
    } catch (error) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    GoogleSignin.configure({
      accountName: 'abc',
      webClientId: FIREBASE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>HighBall Sign In</Text>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleSignIn}
        disabled={isProcessing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'red',
  },
});
