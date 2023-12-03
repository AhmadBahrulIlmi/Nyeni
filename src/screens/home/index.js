import React, {useRef, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {SearchNormal1, NotificationBing, Setting2} from 'iconsax-react-native';
import {fontType, colors} from '../../theme';
import {CategoryList, kontenPopuler} from '../../../data';
import {ListKontenPopuler, ListKontenNyeni} from '../../components';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {RefreshControl} from 'react-native-gesture-handler';

const ItemCategory = ({item, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{...category.title, color}}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.black() : colors.grey();
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={CategoryList}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{gap: 0}} />}
      contentContainerStyle={{paddingHorizontal: 20}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function Home() {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const searchInputAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const listCategoryAnimation = {
    marginTop: animatedValue.interpolate({
      inputRange: [0, 60],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>Nyeni</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <NotificationBing
            color="rgb(255, 161, 0)"
            variant="Linear"
            size={24}
          />
        </View>
        <View style={styles.settingContainer}>
          <Setting2 color="rgb(255, 161, 0)" variant="Linear" size={24} />
        </View>
      </View>

      <View style={{paddingHorizontal: 24, marginTop: 10}}>
        <Animated.View
          style={{...styles.searchContainer, ...searchInputAnimation}}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('CariKonten')}>
            <View style={styles.bgSearch}>
              <SearchNormal1
                size={18}
                color={colors.grey(0.5)}
                variant="Linear"
              />
              <Text style={styles.textSeacrh}>Cari Konten</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
      <Animated.View style={{...styles.listCategory, ...listCategoryAnimation}}>
        <FlatListCategory />
      </Animated.View>
      <View style={{...styles.divider, marginLeft: 24, marginRight: 24}}></View>
      <IsiKonten animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  bgSearch: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    height: 45,
    padding: 15,
    gap: 10,
  },
  textSeacrh: {
    fontSize: 15,
    fontFamily: fontType['Pjs-Light'],
    color: colors.grey(0.5),
    lineHeight: 18,
  },
  headerPopuler: {
    paddingHorizontal: 24,
    marginTop: 5,
    marginBottom: 0,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginRight: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: 'rgb(255, 161, 0)',
  },
  titlePopuler: {
    fontSize: 30,
    marginRight: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  titleRekomendasi: {
    fontSize: 20,
    marginRight: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  settingContainer: {
    marginLeft: 15,
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  searchContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 240, 240)',
  },
  icon: {
    margin: 7,
  },
  divider: {
    borderBottomColor: 'rgb(240, 240, 240)',
    borderBottomWidth: 2,
    width: '400',
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: 'rgb(255, 184, 0)',
    marginHorizontal: 5,
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.black(),
  },
});

const IsiKonten = ({animatedValue}) => {
  const [loading, setLoading] = useState(true);
  const [dataKonten, setdataKonten] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataBlog = async () => {
    try {
      const response = await axios.get(
        'https://6569991fde53105b0dd751f3.mockapi.io/nyeniapp/kontennyeni',
      );
      setdataKonten(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataBlog();
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, []),
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: animatedValue}}}],
        {useNativeDriver: false},
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      scrollEventThrottle={16}>
      <View style={styles.headerPopuler}>
        <Text style={styles.titlePopuler}>Populer</Text>
      </View>
      <View style={styles.IsiKonten}>
        <View style={{marginHorizontal: 20}}>
          {loading ? (
            <ActivityIndicator size={'large'} color="rgb(255, 161, 0)" />
          ) : (
            <ListKontenPopuler data={kontenPopuler} />
          )}
        </View>
      </View>
      <View>
        <View style={styles.headerPopuler}>
          <Text style={styles.titleRekomendasi}>Kesenian Jawa Timur</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={true} horizontal>
          <View>
            <ListKontenNyeni data={dataKonten} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const itemHorizontal = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 5,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 300,
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDescription: {
    padding: 10,
    width: 300,
    height: 200,
  },
  cardCategory: {
    fontFamily: fontType['Pjs-ExtraLight'],
    fontSize: 18,
    color: colors.grey(),
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 15,
    color: colors.black(),
  },
  cardText: {
    fontSize: 15,
    color: colors.black(),
    fontFamily: fontType['Pjs-Regular'],
  },
  cardIsi: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMiniText: {
    fontSize: 24,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardFooter: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
});
