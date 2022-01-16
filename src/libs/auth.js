import auth from '@react-native-firebase/auth';

export async function signInByGoogle(idToken) {
  const credential = await auth.GoogleAuthProvider.credential(idToken);
  const userCredential = auth().signInWithCredential(credential);
  return userCredential;
}

export async function signInByApple(idToken, nonce) {
  const credential = await auth.AppleAuthProvider.credential(idToken, nonce);
  const userCredential = auth().signInWithCredential(credential);
  return userCredential;
}

export const subscribeAuth = callback => auth().onAuthStateChanged(callback);

export const signOut = () => auth().signOut();
