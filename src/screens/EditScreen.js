import React from 'react';
import {View, StatusBar, TextInput, StyleSheet, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
  const [contents, setContents] = React.useState('');

  const handlePickImage = res => {
    if (!res || res.didCancel) {
      return;
    }
    console.log(res);
  };

  const handleLaunchCamera = () => {
    console.log('카메라로 촬영하기');
    launchCamera(imagePickerOption, handlePickImage);
  };

  const handleLaunchImageLibrary = () => {
    console.log('사진 선택하기');
    launchImageLibrary(imagePickerOption, handlePickImage);
  };

  React.useEffect(() => {
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
  }, [handleLaunchCamera, handleLaunchImageLibrary, isNew, modal, navigation]);

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <ScreenLayout>
      <View style={styles.block}>
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
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 104,
  },
  input: {
    flex: 1,
    paddingBottom: 0,
  },
});
