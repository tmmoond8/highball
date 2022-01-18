import firestore from '@react-native-firebase/firestore';
import {getRandomNickname} from '@woowa-babble/random-nickname';
import {getRandomProfileImageUrl} from '../libs/utils';

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName: displayName ?? getRandomNickname('animals'),
    photoURL: photoURL ?? getRandomProfileImageUrl(),
    reports: [],
    blocks: [],
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

export async function blockUser({id, userId: targetId}) {
  const doc = await usersCollection.doc(id).get();
  const user = doc.data();
  const blocks = user.blocks
    ? blocks.filter(postId => postId !== targetId)
    : [];

  await usersCollection.doc(id).update({
    blocks,
  });
  return blocks;
}
