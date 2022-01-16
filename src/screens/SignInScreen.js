import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {FIREBASE_WEB_CLIENT_ID} from '@env';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {signInByGoogle, signInByApple} from '../libs/auth';
import {useUserContext} from '../contexts/userContext';
import {getUser, createUser} from '../libs/users';

export default function SignInScreen() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const {setUser} = useUserContext();
  const handleGoogleSignIn = async () => {
    try {
      setIsProcessing(true);
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const {user} = await signInByGoogle(idToken);
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
        setIsProcessing(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setIsProcessing(false);
        // play services not available or outdated
      } else {
        setIsProcessing(false);
        // some other error happezned
      }
    }
  };

  const handleAppleSignIn = async () => {
    setIsProcessing(true);
    try {
      const {identityToken, nonce} = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const {user} = await signInByApple(identityToken, nonce);
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
      console.error(error);
    }
    setIsProcessing(false);
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
      <Text style={styles.title}>HighBall SignIn</Text>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
        disabled={isProcessing}
      />
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appbleButton}
        onPress={handleAppleSignIn}
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
  googleButton: {
    width: 192,
    height: 48,
  },
  appbleButton: {
    width: 186,
    height: 44,
    marginTop: 8,
  },
});
