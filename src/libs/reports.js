import firestore from '@react-native-firebase/firestore';

const reportsCollection = firestore().collection('reports');

export function createReport({user, type, targetId}) {
  return reportsCollection.add({
    user,
    type,
    targetId,
  });
}
