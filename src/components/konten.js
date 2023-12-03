import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {fontType, colors} from '../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

const ListKontenNyeni = ({data}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{...itemHorizontal.card}}
        onPress={() =>
          navigation.navigate('DetailKonten', {kontenId: item.id})
        }>
        <Image
          source={{
            uri: item.image,
          }}
          style={itemHorizontal.cardImage}
        />
        <View style={itemHorizontal.cardDescription}>
          <Text style={itemHorizontal.cardCategory}>{item.kategori.name}</Text>
          <Text style={itemHorizontal.cardText}>{item.deskripsi}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{paddingLeft: 20}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default ListKontenNyeni;

const itemHorizontal = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 5,
    overflow: 'hidden',
    flexDirection: 'row',
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
    width: 100,
    height: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDescription: {
    padding: 10,
    width: 250,
    height: 'auto',
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
});
