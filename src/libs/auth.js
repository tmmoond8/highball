import auth from '@react-native-firebase/auth';

export async function SignIn(idToken) {
  const credential = await auth.GoogleAuthProvider.credential(idToken);
  const userCredential = auth().signInWithCredential(credential);
  return userCredential;
}

export const subscribeAuth = callback => auth().onAuthStateChanged(callback);
