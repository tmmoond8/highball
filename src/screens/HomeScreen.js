import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SHEET_URL} from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from '../styles';
import BottleList from '../components/BottleList';

const Slider = createMaterialTopTabNavigator();

const TYPES_OF_ALCOHOL = [
  {name: '버번 위스키', type: 'bourbonWhiskey'},
  {name: '진', type: 'gin'},
  {name: '보드카', type: 'vodka'},
  {name: '데낄라', type: 'tequila'},
  {name: '리큐르', type: 'liqueur'},
  {name: '럼', type: 'rum'},
  {name: ' 블렌디드  위스키', type: 'blendedWhiskey'},
  {name: ' 싱글 몰트 위스키', type: 'singleMaltWhiskey'},
  {name: ' 블렌디드  몰트 위스키', type: 'blendedMaltWhiskey'},
  {name: '브랜디', type: 'brandy'},
  {name: '사케', type: 'sake'},
  {name: '중국술', type: 'chinese'},
];

const renderBottleList = data =>
  Object.values(TYPES_OF_ALCOHOL).reduce((acc, {name, type}) => {
    acc[name] = () => (
      <BottleList
        data={data.filter(({category}) => category === type)}
        key={type}
      />
    );
    return acc;
  }, {});

export default function HomeScreen() {
  const [sheet, setSheet] = React.useState([]);
  const localSheet = React.useRef(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const [minLoading, setMinLoading] = React.useState(false);
  const dimensions = useWindowDimensions();

  const isLoading = React.useMemo(
    () => sheet.length === 0 || isFetching || minLoading,
    [sheet, isFetching, minLoading],
  );
  React.useEffect(() => {
    AsyncStorage.getItem('bottles').then(sheet => {
      if (sheet) {
        const _sheet = JSON.parse(sheet);
        setSheet(_sheet);
        localSheet.current = _sheet;
      }
    });
    fetch(`${SHEET_URL}?sheetName=highball`)
      .then(r => {
        return r.json();
      })
      .then(d => {
        if (JSON.stringify(d.data) !== JSON.stringify(localSheet.current)) {
          setIsFetching(true);
          setMinLoading(true);

          AsyncStorage.setItem('bottles', JSON.stringify(d.data))
            .then(() => {
              setIsFetching(false);
              setSheet(d.data);
            })
            .catch(e => {
              setIsFetching(false);
            });
          setTimeout(() => {
            setMinLoading(false);
          }, 2000);
        }
      })
      .catch(e => {
        console.log('e', e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Slider.Navigator
        initialRouteName="whiskey"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 88},
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          },
        }}>
        {TYPES_OF_ALCOHOL.map(({name, type}, index) => (
          <Slider.Screen
            key={type}
            name={name}
            component={renderBottleList(sheet)[name]}
          />
        ))}
      </Slider.Navigator>
      {isLoading && (
        <View
          style={[
            styles.block,
            {
              width: dimensions.width,
              height: dimensions.height,
            },
          ]}>
          <ActivityIndicator style={styles.loading} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: 82,
    height: 82,
    backgroundColor: 'rgba(144, 144, 144, 0.2)',
    borderRadius: 20,
  },
});
