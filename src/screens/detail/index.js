import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Back,
} from 'iconsax-react-native';
import {fontType, colors} from '../../theme';
import {kontenPopulerDetail} from '../../../data';
import {useNavigation} from '@react-navigation/native';

const Detail = ({route}) => {
  const {detailId} = route.params;
  const selectedDetail = kontenPopulerDetail.find(blog => blog.id === detailId);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
        }}>
        <Image
          style={styles.image}
          source={{
            uri: selectedDetail.image,
          }}
          resizeMode={'cover'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
        </View>
        <Text style={styles.title}>{selectedDetail.title}</Text>
        <Text style={styles.content}>{selectedDetail.description}</Text>
        <Text style={styles.content}>{selectedDetail.origin}</Text>
        <Text style={styles.content}>{selectedDetail.conclusion}</Text>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Detail;
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
  image: {
    height: 300,
    width: 'auto',
  },
  title: {
    marginTop: 0,
    paddingHorizontal : 10,
    fontSize: 30,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  content: {
    marginTop: 10,
    paddingHorizontal : 10,
    lineHeight: 25,
    fontSize: 16,
    textAlign:'justify',
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
});
