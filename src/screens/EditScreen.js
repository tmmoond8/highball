import React from 'react';
import {View, StatusBar, TextInput, StyleSheet} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import IconButton from '../components/IconButton';

export default function EditScreen({navigation, route}) {
  const postId = route?.params?.postId;
  const isNew = !postId;
  const [contents, setContents] = React.useState('');

  React.useEffect(() => {
    navigation.setOptions({
      title: isNew ? '새 게시물 작성' : '게시물 수정',
      headerRight: () => (
        <>
          <IconButton
            name="camera-alt"
            onPress={() => console.log('aaa')}
            _styles={{
              paddingRight: 16,
            }}
          />
          <IconButton name="check" onPress={() => console.log('aaa')} />
        </>
      ),
    });
  }, [isNew, navigation]);

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
