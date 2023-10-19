import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {fontType, colors} from '../theme';
import {Like1} from 'iconsax-react-native';
const ItemHorizontal = ({item, variant, onPress}) => {
  return (
    <View style={{...itemHorizontal.card}}>
      <Image
        source={{
          uri: item.image,
        }}
        style={itemHorizontal.cardImage}
      />
      <View style={itemHorizontal.cardDescription}>
        <Text style={itemHorizontal.cardCategory}>{item.category}</Text>
        <Text style={itemHorizontal.cardTitle}>{item.title}</Text>
        <Text style={itemHorizontal.cardText}>{item.description}</Text>
        <View style={itemHorizontal.cardFooter}>
          <View style={itemHorizontal.iconContainer}>
            <TouchableOpacity onPress={onPress}>
              <Like1
                color="rgb(255, 161, 0)"
                variant={variant}
                size={25}
                style={itemHorizontal.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={itemHorizontal.viewContainer}>
            <Text>Lihat Detail..</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const ListKontenPopuler = ({data}) => {
  const [like, setLike] = useState([]);
  const toggleLike = itemId => {
    if (like.includes(itemId)) {
      setLike(like.filter(id => id !== itemId));
    } else {
      setLike([...like, itemId]);
    }
  };
  const renderItem = ({item}) => {
    variant = like.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemHorizontal
        item={item}
        variant={variant}
        onPress={() => toggleLike(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default ListKontenPopuler;
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
