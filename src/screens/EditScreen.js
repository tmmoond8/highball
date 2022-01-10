import React from 'react';
import {
  View,
  StatusBar,
  TextInput,
  StyleSheet,
  Keyboard,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AutoHeightImage from 'react-native-auto-height-image';
import storage from '@react-native-firebase/storage';
import {v4 as uuid} from 'uuid';
import eventBus from '../libs/eventBus';
import {useUserContext} from '../contexts/userContext';
import ScreenLayout from '../components/ScreenLayout';
import IconButton from '../components/IconButton';
import {useUiContext} from '../contexts/uiContext';
import {createPost, updatePost} from '../libs/posts';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

export default function EditScren({navigation, route}) {
  const params = route?.params ?? {};
  const isNew = !params.id;
  const {user} = useUserContext();
  const {modal} = useUiContext();
  const {width} = useWindowDimensions();
  const [contents, setContents] = React.useState(params.contents ?? '');
  const [image, setImage] = React.useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    navigation.pop();
    if (isNew) {
      const extension = image.fileName.split('.').pop();
      const reference = storage().ref(
        `/photo/${user.id}/${uuid()}.${extension}`,
      );
      if (Platform.OS === 'android') {
        await reference.putString(image.base64, 'base64', {
          contentType: image.type,
        });
      } else {
        await reference.putFile(image.uri);
      }
      const photoURL = await reference.getDownloadURL();
      await createPost({contents, photoURL, user});
      eventBus.emit('refresh');
    } else {
      // 업데이트 처리
      let photoURL = params.photoURL;
      if (image) {
        const extension = image.fileName.split('.').pop();
        const reference = storage().ref(
          `/photo/${user.id}/${uuid()}.${extension}`,
        );
        if (Platform.OS === 'android') {
          await reference.putString(image.base64, 'base64', {
            contentType: image.type,
          });
        } else {
          await reference.putFile(image.uri);
        }
        photoURL = await reference.getDownloadURL();
      }
      await updatePost({contents, photoURL, id: params.id});
      eventBus.emit('updatePost', {
        postId: params.id,
        contents,
        photoURL,
      });
    }
  }, [navigation, isNew, image, user, contents, params.photoURL, params.id]);

  React.useEffect(() => {
    const handlePickImage = res => {
      if (!res || res.didCancel) {
        return;
      }
      if (res.assets[0]) {
        setImage(res.assets[0]);
      }
    };
    const handleLaunchCamera = () => {
      launchCamera(imagePickerOption, handlePickImage);
    };

    const handleLaunchImageLibrary = () => {
      launchImageLibrary(imagePickerOption, handlePickImage);
    };

    navigation.setOptions({
      title: isNew ? '새 게시물 작성' : '게시물 수정',
      headerRight: () => (
        <>
          <IconButton
            name="camera-alt"
            onPress={() => {
              modal.open([
                {
                  icon: 'camera-alt',
                  text: '카메라로 촬영하기',
                  onPress: handleLaunchCamera,
                },
                {
                  icon: 'photo',
                  text: '사진 선택하기',
                  onPress: handleLaunchImageLibrary,
                },
              ]);
            }}
            _styles={{
              paddingRight: 16,
            }}
          />
          <IconButton name="check" onPress={handleSubmit} />
        </>
      ),
    });
  }, [isNew, modal, navigation, handleSubmit]);

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  React.useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  return (
    <ScreenLayout>
      <View style={styles.block}>
        {(image || params.photoURL) && (
          <AutoHeightImage
            style={[
              isKeyboardOpen && {
                position: 'absolute',
                right: 16,
                top: 16,
              },
            ]}
            source={{uri: image?.uri ?? params.photoURL}}
            width={!isKeyboardOpen ? width : 120}
          />
        )}
        <TextInput
          style={styles.input}
          multiline
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          placeholder="내용을 입력하세요...."
          textAlignVertical="top"
          value={contents}
          onChangeText={setContents}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 104,
  },
  input: {
    flex: 1,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 0,
  },
});
