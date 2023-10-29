import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {NotificationBing, Setting2} from 'iconsax-react-native';
import {fontType, colors} from '../../theme';
import {ListKategori} from '../../../data';
import {ListKontenKategori} from '../../components';

export default function Kategori() {
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
      <View>
        <ImageBackground
          style={itemHorizontal.imageBanner}
          source={{
            uri: 'https://i.pinimg.com/564x/34/40/20/34402011d3cbebd03b5d9d09471e6a69.jpg',
          }}
          resizeMode="cover">
            <View style={styles.overlay}>
              <Text style={itemHorizontal.textBanner}>Kategori</Text>
            </View>
        </ImageBackground>
        <View style={styles.deskripsi}>
          <Text>Kesenian Khas Jawa Timur</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          {ListKategori.map((item, index) => (
            <ListKontenKategori item={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
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
  imageBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  textBanner: {
    color: 'white',
    fontSize: 24,
    marginVertical: 75,
    marginLeft: 24,
  },
});

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
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginRight: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: 'rgb(255, 161, 0)',
  },
  settingContainer: {
    marginLeft: 15,
  },
  icon: {
    margin: 7,
  },
  deskripsi:{
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
  },
});
