import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  SearchNormal1,
  NotificationBing,
  Like1,
  Setting2,
  Home2,
  BookSquare,
  Bookmark,
} from 'iconsax-react-native';
import {fontType, colors} from './src/theme';
import {CategoryList, kontenPopuler} from './data';
import {ListKontenPopuler, Navbar} from './src/components';

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
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function App() {
  const [searchText, setSearchText] = useState('');
  const handleSearchPress = text => {
    setSearchText(text);
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
        <View style={styles.searchContainer}>
          <SearchNormal1
            color={colors.black()}
            variant="Linear"
            size={20}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Cari Konten"
            onChangeText={handleSearchPress}
            value={searchText}
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={styles.listCategory}>
        <FlatListCategory />
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{...category.item, marginLeft: 24}}>
            <Text style={category.title}>Populer</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Seni Tari</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Musik</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Pertunjukan</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Kerajinan Tangan</Text>
          </View>
        </ScrollView> */}
      </View>
      <View style={{...styles.divider, marginLeft: 24, marginRight: 24}}></View>
      <IsiKonten />
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.navbarItem}>
          <Home2 color="rgb(255, 161, 0)" variant="Linear" size={24} />
          <Text style={styles.navbarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarItem}>
          <BookSquare color="rgb(255, 161, 0)" variant="Linear" size={24} />
          <Text style={styles.navbarText}>Other</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarItem}>
          <Bookmark color="rgb(255, 161, 0)" variant="Linear" size={24} />
          <Text style={styles.navbarText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    elevation: 5,
  },
  navbarItem: {
    alignItems: 'center',
    padding: 10,
  },
  navbarText: {
    fontSize: 12,
    color: 'rgb(0, 0, 0)',
    marginTop: 1,
  },
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
    backgroundColor: 'rgb(240, 240, 240)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButtonContainer: {
    paddingLeft: 14,
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

const IsiKonten = () => {
  return (
    <ScrollView>
      <View style={styles.headerPopuler}>
        <Text style={styles.titlePopuler}>Populer</Text>
      </View>
      <View style={styles.IsiKonten}>
        <View style={{marginHorizontal: 20}}>
          <ListKontenPopuler data={kontenPopuler} />
        </View>
        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{gap: 5}}>
          <View style={{...itemHorizontal.card, marginLeft: 24}}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/b6/5c/66/b65c66326463167bce1675efa26eaa35.jpg',
              }}
              style={itemHorizontal.cardImage}
            />
            <View style={itemHorizontal.cardDescription}>
              <Text style={itemHorizontal.cardCategory}>Seni Tari</Text>
              <Text style={itemHorizontal.cardTitle}>Jaranan</Text>
              <Text style={itemHorizontal.cardText}>
                Kesenian ini merupakan bentuk Samanisme dalam ajaran animisme
              </Text>
              <View style={itemHorizontal.cardFooter}>
                <View style={itemHorizontal.iconContainer}>
                  <Like1
                    color="rgb(255, 161, 0)"
                    variant="Linear"
                    size={25}
                    style={itemHorizontal.icon}
                  />
                </View>
                <View style={itemHorizontal.viewContainer}>
                  <Text>Lihat Detail..</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{...itemHorizontal.card}}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/f0/9f/4e/f09f4eb71703ed9f7947c1cf70800df9.jpg',
              }}
              style={itemHorizontal.cardImage}
            />
            <View style={itemHorizontal.cardDescription}>
              <Text style={itemHorizontal.cardCategory}>Musik</Text>
              <Text style={itemHorizontal.cardTitle}>Gamelan Jawa</Text>
              <Text style={itemHorizontal.cardText}>
                Kesenian musik perkusi yang digunakan pada seni musik karawitan
              </Text>
              <View style={itemHorizontal.cardFooter}>
                <View style={itemHorizontal.iconContainer}>
                  <Like1
                    color="rgb(255, 161, 0)"
                    variant="Linear"
                    size={25}
                    style={itemHorizontal.icon}
                  />
                </View>
                <View style={itemHorizontal.viewContainer}>
                  <Text>Lihat Detail..</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{...itemHorizontal.card}}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/2b/d2/42/2bd242c1c898e670414a2d622a425439.jpg',
              }}
              style={itemHorizontal.cardImage}
            />
            <View style={itemHorizontal.cardDescription}>
              <Text style={itemHorizontal.cardCategory}>Pertunjukan</Text>
              <Text style={itemHorizontal.cardTitle}>Ludruk</Text>
              <Text style={itemHorizontal.cardText}>
                Kesenian ini drama tradisional jawa timur yang diperagakan oleh
                sebuah grup kesenian
              </Text>
              <View style={itemHorizontal.cardFooter}>
                <View style={itemHorizontal.iconContainer}>
                  <Like1
                    color="rgb(255, 161, 0)"
                    variant="Linear"
                    size={25}
                    style={itemHorizontal.icon}
                  />
                </View>
                <View style={itemHorizontal.viewContainer}>
                  <Text>Lihat Detail..</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView> */}
      </View>
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{gap: 0}}>
          <View
            style={{
              ...itemHorizontal.card,
              marginTop: 20,
              marginLeft: 24,
              width: 200,
              height: 100,
              position: 'relative',
              opacity: 0.8,
            }}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/7e/0d/a9/7e0da932ed99c04c700899f6bb7f659e.jpg',
              }}
              style={itemHorizontal.cardImage}
            />
            <View style={itemHorizontal.cardIsi}>
              <Text style={itemHorizontal.cardMiniText}>Musik</Text>
            </View>
          </View>
          <View
            style={{
              ...itemHorizontal.card,
              marginTop: 20,
              marginLeft: 24,
              width: 200,
              height: 100,
              position: 'relative',
              opacity: 0.8,
            }}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/0f/5f/57/0f5f57953abd50242da45a458a3fb2cd.jpg',
              }}
              style={itemHorizontal.cardImage}
            />
            <View style={itemHorizontal.cardIsi}>
              <Text style={itemHorizontal.cardMiniText}>Seni Tari</Text>
            </View>
          </View>
          <View
            style={{
              ...itemHorizontal.card,
              marginTop: 20,
              marginLeft: 24,
              width: 200,
              height: 100,
              position: 'relative',
              opacity: 0.8,
            }}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/0b/5b/3c/0b5b3c05788a2dfc3814d127dc0b5a10.jpg',
              }}
              style={itemHorizontal.cardImage}
            />
            <View style={itemHorizontal.cardIsi}>
              <Text style={itemHorizontal.cardMiniText}>Kerajinan</Text>
            </View>
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
