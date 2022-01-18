import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActionSheetIOS, Platform} from 'react-native';
import eventBus from './eventBus';
import {useUserContext} from '../contexts/userContext';

const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, contents}) {
  return postsCollection.add({
    user,
    photoURL,
    contents,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE = 12;

export async function getPosts({userId, mode, id} = {}) {
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getOlderPosts(id, userId) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

export async function getNewerPosts(id, userId) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}

export function removePost(id) {
  return postsCollection.doc(id).delete();
}

export function updatePost({id, contents, photoURL}) {
  return postsCollection.doc(id).update({
    contents,
    photoURL,
  });
}

export function usePosts(userId) {
  const [posts, setPosts] = React.useState(null);
  const [noMorePost, setNoMorePost] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const {user} = useUserContext();

  const handleLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost, userId);

    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const handleRefresh = React.useCallback(async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }
    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id, userId);
    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  }, [posts, userId, refreshing]);

  const handleRemove = React.useCallback(
    postId => {
      setPosts(posts.filter(post => post.id !== postId));
    },
    [posts],
  );

  const handleUpdate = React.useCallback(
    ({postId, contents, photoURL}) => {
      // id가  일치하는 포스트를 찾아서 contents 변경
      const nextPosts = posts
        .filter(d => d)
        .map(post =>
          post.id === postId ? {...post, contents, photoURL} : post,
        );
      setPosts(nextPosts);
    },
    [posts],
  );

  React.useEffect(() => {
    getPosts({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_SIZE) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  usePostsEventEffect({
    onRefresh: handleRefresh,
    onRemovePost: handleRemove,
    onUpdatePost: handleUpdate,
    enabled: !userId || userId === user?.id,
  });

  return {
    posts,
    noMorePost,
    refreshing,
    handleLoadMore,
    handleRefresh,
    handleRemove,
  };
}

export function usePostActions({id, contents} = {}) {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const edit = () => {
    navigation.navigate('Modify', {
      id,
      contents,
    });
  };

  const remove = async () => {
    await removePost(id);

    if (route.name === 'Post') {
      navigation.pop();
    }

    eventBus.emit('removePost', id);
  };

  const handlePressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    }
  };

  const handleClose = () => {
    setIsSelecting(false);
  };

  const actions = [
    {
      icon: 'edit',
      text: '설명 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];

  return {
    isSelecting,
    handlePressMore,
    handleClose,
    actions,
  };
}

export function usePostsEventEffect({
  enabled,
  onRefresh,
  onRemovePost,
  onUpdatePost,
}) {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    eventBus.addListener('refresh', onRefresh);
    eventBus.addListener('removePost', onRemovePost);
    eventBus.addListener('updatePost', onUpdatePost);

    return () => {
      eventBus.removeListener('refresh', onRefresh);
      eventBus.removeListener('removePost', onRemovePost);
      eventBus.removeListener('updatePost', onUpdatePost);
    };
  }, [enabled, onRefresh, onRemovePost, onUpdatePost]);
}
