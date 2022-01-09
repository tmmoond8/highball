import React from 'react';
import {Text, Image, Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getImageUrl} from '../libs/utils';
import Avatar from './Avatar';
import {useUserContext} from '../contexts/userContext';
// import ActionSheetModal from './ActionSheetModal';
import {usePostActions} from '../libs/posts';

export default function PostCard({user, photoURL, contents, createdAt, id}) {
  const navigation = useNavigation();
  // const {isSelecting, handlePressMore, handleClose, actions} = usePostActions({
  //   id,
  //   description,
  // });
  const {user: me} = useUserContext();
  const isMyPost = me.id === user.id;
  const date = React.useMemo(
    () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
    [createdAt],
  );
  const handleOpenProfile = () => {
    if (isMyPost) {
      navigation.navigate('MyProfile');
    }
    navigation.navigate('Profile', {
      userId: user.id,
      displayName: user.displayName,
    });
  };
  return (
    <>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile} onPress={handleOpenProfile}>
            <Avatar
              source={{
                uri: getImageUrl(user?.photoURL),
              }}
            />
            <Text style={styles.displayName}>{user.displayName}</Text>
          </Pressable>
          {isMyPost && (
            <Pressable hitSlop={8} onPress={() => 'handlePressMore'}>
              <Icon name="more-vert" size={20} />
            </Pressable>
          )}
        </View>
        <Image
          source={{uri: photoURL}}
          style={styles.image}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <View style={styles.paddingBlock}>
          <Text style={styles.contents}>{contents}</Text>
          <Text date={date} style={styles.date}>
            {date.toLocaleString()}
          </Text>
        </View>
      </View>
      {/* <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={handleClose}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 42,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  contents: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});
