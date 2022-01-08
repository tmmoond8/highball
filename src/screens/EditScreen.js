import React from 'react';
import {View, StatusBar, TextInput, StyleSheet} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import IconButton from '../components/IconButton';
import {useUiContext} from '../contexts/uiContext';

export default function EditScreen({navigation, route}) {
  const postId = route?.params?.postId;
  const isNew = !postId;
  const {modal} = useUiContext();
  const [contents, setContents] = React.useState('');

  const handleLaunchCamera = () => {
    console.log('카메라로 촬영하기');
  };

  const handleLaunchImageLibrary = () => {
    console.log('사진 선택하기');
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
  }, [isNew, modal, navigation]);

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
