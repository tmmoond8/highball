import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
    reports: [],
  });
}

export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}

export async function addReport({id, postId}) {
  const doc = await usersCollection.doc(id).get();
  const user = doc.data();
  const reports = user.reports ?? [];
  reports.push(postId);
  await usersCollection.doc(id).update({
    reports,
  });
  return reports;
}

export async function removeReport({id, postId: targetId}) {
  const doc = await usersCollection.doc(id).get();
  const user = doc.data();
  const reports = user.reports
    ? user.reports.filter(postId => postId !== targetId)
    : [];

  await usersCollection.doc(id).update({
    reports,
  });
  return reports;
}
