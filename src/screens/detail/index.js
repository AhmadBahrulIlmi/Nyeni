import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import {
  Back,
} from 'iconsax-react-native';
import {fontType, colors} from '../../theme';
import {kontenPopulerDetail} from '../../../data';
import {useNavigation} from '@react-navigation/native';

const Detail = ({route}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 56],
    outputRange: [0, 56],
  });

  const {detailId} = route.params;
  const selectedDetail = kontenPopulerDetail.find(blog => blog.id === detailId);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
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
      </Animated.ScrollView>
      <Animated.View style={[styles.bottomBar, {transform:[{translateY:bottomBarY}]}]}>
      <View style={{flexDirection:'row', gap:5, alignItems:'center',}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        </View>
      </Animated.View>
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
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgb(255, 161, 0)',
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
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
