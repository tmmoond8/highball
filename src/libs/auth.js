import auth from '@react-native-firebase/auth';

export function SignIn({email, password}) {
  const credential = auth.GoogleAuthProvider.credential('{token}');
  const userCredential = auth().signInWithCredential(credential);
  return userCredential;
}
