import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import BottleList from '../components/BottleList';
import AsyncStorage from '@react-native-community/async-storage';
import IconButton from '../components/IconButton';

export default function SearchScreen() {
  const [sheet, setSheet] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const searchResults = React.useMemo(() => {
    if (!search || sheet.length === 0) return [];
    return sheet.filter(({model}) => model.toString().indexOf(search) !== -1);
  }, [search, sheet]);

  React.useEffect(() => {
    AsyncStorage.getItem('bottles').then(sheet => {
      if (sheet) {
        const _sheet = JSON.parse(sheet);
        setSheet(_sheet);
      }
    });
  }, []);

  return (
    <View style={styles.block}>
      <View style={styles.searchBlock}>
        <TextInput
          style={styles.input}
          multiline
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          placeholder="내용을 입력하세요...."
          textAlignVertical="top"
          value={search}
          onChangeText={setSearch}
        />
        {!!search && (
          <IconButton
            name="close"
            onPress={() => {
              setSearch('');
            }}
            color="#888"
          />
        )}
      </View>
      <BottleList data={searchResults} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBlock: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});
