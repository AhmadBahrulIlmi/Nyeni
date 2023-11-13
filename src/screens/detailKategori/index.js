import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import {Back} from 'iconsax-react-native';
import {fontType, colors} from '../../theme';
import {ListDetailKategori} from '../../../data';
import {useNavigation} from '@react-navigation/native';

const DetailKategori = ({route}) => {
  const {kategoriID} = route.params;
  const selectedDetail = ListDetailKategori.find(
    blog => blog.id === kategoriID,
  );
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: selectedDetail.image,
            }}
            resizeMode={'cover'}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{selectedDetail.category}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DetailKategori;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  bottomBar: {
    backgroundColor: 'rgb(255, 161, 0)',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 100,
    width: 200,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent:'center',
  },
  title: {
    marginTop: 0,
    paddingHorizontal: 10,
    fontSize: 30,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 10,
    lineHeight: 25,
    fontSize: 16,
    textAlign: 'justify',
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
});
