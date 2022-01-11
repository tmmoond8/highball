import React from 'react';
import PostCard from '../components/PostCard';
import eventBus from '../libs/eventBus';

export default function PostScreen({navigation, route}) {
  const post = route?.params?.post;
  const {id, createdAt, user} = post;
  const [contents, setContents] = React.useState(post.contents);
  const [photoURL, setPhotoURL] = React.useState(post.photoURL);

  React.useEffect(() => {
    const updatePost = updated => {
      if (updated.postId === id) {
        setContents(updated.contents);
        setPhotoURL(updated.photoURL);
      }
    };
    eventBus.addListener('updatePost', updatePost);
    return () => {
      eventBus.removeListener('updatePost', updatePost);
    };
  }, [id]);
  if (!post) {
    return navigation.pop();
  }
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
