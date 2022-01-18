import React from 'react';
import {Alert, Text, Image, Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getImageUrl} from '../libs/utils';
import Avatar from './Avatar';
import {useUserContext} from '../contexts/userContext';
import {useUiContext} from '../contexts/uiContext';
import {removePost} from '../libs/posts';
import eventBus from '../libs/eventBus';

export default function PostCard({user, photoURL, contents, createdAt, id}) {
  const navigation = useNavigation();
  const {modal} = useUiContext();
  const {user: me, report, unreport, setUser} = useUserContext();
  const isMyPost = me?.id === user.id;
  const date = React.useMemo(
    () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
    [createdAt],
  );
  const handleOpenProfile = () => {
    if (isMyPost) {
      return navigation.navigate('MyProfile');
    }
    navigation.navigate('Profile', {
      userId: user.id,
      displayName: user.displayName,
    });
  };

  const moveModify = () => {
    navigation.push('Edit', {
      id,
      photoURL,
      contents,
      createdAt,
    });
  };

  const deletePost = () => {
    Alert.alert(
      '게시글을 삭제하시겠습니까?',
      '삭제된 게시글은 복구되지 않습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            removePost(id);
            eventBus.emit('removePost', id);
          },
          style: 'destructive',
        },
      ],
    );
  };

  const blockUser = () => {
    Alert.alert(
      '사용자 차단',
      '사용자를 차단합니다. 차단한 사용자는 나의 프로필 페이지에서 해제할 수 있습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '차단',
          onPress: () => {
            removePost(id);
            setUser({
              ...me,
              blocks: me.blocks.concat(id),
            });
            eventBus.emit('refresh');
          },
          style: 'destructive',
        },
      ],
    );
  };

  const cancelReportPost = () => {
    Alert.alert('게시글을 신고 해제 하시겠습니까?', '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '신고 해제',
        onPress: () => {
          unreport(id);
        },
        style: 'default',
      },
    ]);
  };

  const reportPost = () => {
    if (!me) {
      return navigation.push('SignIn');
    }
    Alert.alert('게시글을 신고하겠습니까?', '신고는 어쩌구 저쩌구', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '신고',
        onPress: () => {
          report(id);
        },
        style: 'destructive',
      },
    ]);
  };

  const handleClickMore = () => {
    if (isMyPost) {
      modal.open([
        {
          icon: 'md-edit-note',
          text: '수정',
          onPress: moveModify,
        },
        {
          icon: 'md-delete',
          text: '삭제',
          onPress: deletePost,
        },
      ]);
    } else {
      modal.open([
        {
          icon: 'md-block',
          text: '사용자 차단',
          onPress: blockUser,
        },
        me && me.reports.includes(id)
          ? {
              icon: 'md-outline-error',
              text: '신고 해제',
              onPress: cancelReportPost,
            }
          : {
              icon: 'md-outline-error',
              text: '신고',
              onPress: reportPost,
            },
      ]);
    }
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
          <Pressable hitSlop={8} onPress={handleClickMore}>
            <Icon name="more-vert" size={20} />
          </Pressable>
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
