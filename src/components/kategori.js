import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {fontType, colors} from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const ListKontenKategori = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{...itemHorizontal.card}}onPress={() => navigation.navigate('detailKategori', {kategoriID: item.id})}>
      <Image
        source={{
          uri: item.image,
        }}
        style={itemHorizontal.cardImage}
      />
      <View style={itemHorizontal.cardDescription}>
        <Text style={itemHorizontal.cardCategory}>{item.category}</Text>
        <Text style={itemHorizontal.cardText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListKontenKategori;
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
    width: 300,
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
