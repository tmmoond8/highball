import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FIREBASE_WEB_CLIENT_ID} from '@env';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function SignInScreen() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const handleSignIn = async () => {
    try {
      setIsProcessing(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      setUserInfo(userInfo);
      setIsLoggedIn(true);
    } catch (error) {
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
    GoogleSignin.configure({
      accountName: 'abc',
      webClientId: FIREBASE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  return (
    <View style={styles.fullScreen}>
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
  },
  button: {
    backgroundColor: 'red',
  },
});
