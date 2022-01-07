import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {usePosts} from '../libs/posts';
import {getUser} from '../libs/users';
import {getImageUrl} from '../libs/utils';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

export default function Profile({userId}) {
  const [user, setUser] = React.useState(null);
  const {posts, noMorePost, refreshing, handleLoadMore, handleRefresh} =
    usePosts(userId);

  const renderItem = React.useMemo(() => {
    return ({item}) => <PostGridItem post={item} />;
  }, []);

  React.useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar
            source={{
              uri: getImageUrl(user.photoURL),
            }}
            size={128}
          />
          <Text style={styles.userName}>{user.displayName}</Text>
        </View>
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  spinner: {flex: 1, justifyContent: 'center'},
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  userName: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    height: 128,
  },
});
