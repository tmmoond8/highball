import React from 'react';
import PostCard from '../components/PostCard';

export default function PostScreen({navigation, route}) {
  const post = route?.params?.post;
  if (!post) {
    return navigation.pop();
  }
  const {id, createdAt, contents, user, photoURL} = post;
  return (
    <PostCard
      user={user}
      id={id}
      createdAt={createdAt}
      contents={contents}
      photoURL={photoURL}
    />
  );
}
