import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import PostCard from '../components/PostCard';
import {usePosts} from '../libs/posts';
import PostingButton from '../components/PostingButton';

export default function FeedScreen() {
  const {posts, noMorePost, refreshing, handleRefresh, handleLoadMore} =
    usePosts();
  const dimensions = useWindowDimensions();
  const renderItem = React.useMemo(
    () =>
      ({item}) =>
        item ? <PostCard {...item} /> : null,
    [],
  );

  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.75}
        ListFooterComponent={
          !noMorePost && (
            <View
              style={[
                styles.spinnerWrapper,
                {
                  height: dimensions.height,
                },
              ]}>
              <ActivityIndicator
                style={styles.spinner}
                size={21}
                color="#6200ee"
              />
            </View>
          )
        }
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
        }
      />
      <PostingButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinnerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    height: 64,
  },
});
