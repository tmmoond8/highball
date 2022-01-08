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
import ScreenLayout from '../components/ScreenLayout';
import IconButton from '../components/IconButton';
import {useUiContext} from '../contexts/uiContext';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

export default function EditScreen({navigation, route}) {
  const postId = route?.params?.postId;
  const isNew = !postId;
  const {modal} = useUiContext();
  const {width} = useWindowDimensions();
  const [contents, setContents] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    const handlePickImage = res => {
      if (!res || res.didCancel) {
        return;
      }
      if (res.assets[0]?.uri) {
        setImageUrl(res.assets[0].uri);
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
          <IconButton name="check" onPress={() => console.log('aaa')} />
        </>
      ),
    });
  }, [isNew, modal, navigation]);

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
        {imageUrl && (
          <AutoHeightImage
            style={[
              isKeyboardOpen && {
                position: 'absolute',
                right: 16,
                top: 16,
              },
            ]}
            source={{uri: imageUrl}}
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
