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
import {ArchiveMinus, Like1} from 'iconsax-react-native';

const ItemHorizontal = ({
  item,
  isLiked,
  isBookmarked,
  onLikePress,
  onBookmarkPress,
}) => {
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
            <TouchableOpacity onPress={onLikePress}>
              <Like1
                color={isLiked ? 'rgb(255, 161, 0)' : 'rgb(255, 161, 0)'}
                variant={isLiked ? 'Bold' : 'Linear'}
                size={25}
                style={itemHorizontal.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', bottom: 155, left:255 }} onPress={onBookmarkPress}>
            <ArchiveMinus
              color={isBookmarked ? 'rgb(255, 161, 0)' : 'rgb(255, 161, 0)'}
              variant={isBookmarked ? 'Bold' : 'Linear'}
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
  const [likedItem, setLikedItem] = useState(null);
  const [bookmarkedItem, setBookmarkedItem] = useState(null);

  const toggleLike = itemId => {
    if (likedItem === itemId) {
      setLikedItem(null);
    } else {
      setLikedItem(itemId);
    }
  };

  const toggleBookmark = itemId => {
    if (bookmarkedItem === itemId) {
      setBookmarkedItem(null);
    } else {
      setBookmarkedItem(itemId);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ItemHorizontal
        item={item}
        isLiked={likedItem === item.id}
        isBookmarked={bookmarkedItem === item.id}
        onLikePress={() => toggleLike(item.id)}
        onBookmarkPress={() => toggleBookmark(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
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
