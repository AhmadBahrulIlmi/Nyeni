import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {Back, More} from 'iconsax-react-native';
import {fontType, colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ActionSheet from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';

const DetailKonten = ({route}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 56],
    outputRange: [0, 56],
  });

  const navigation = useNavigation();
  const {kontenId} = route.params;
  const [dataKonten, setdataKonten] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('konten')
      .doc(kontenId)
      .onSnapshot(documentSnapshot => {
        const dataKonten = documentSnapshot.data();
        if (dataKonten) {
          console.log('Data Konten : ', dataKonten);
          setdataKonten(dataKonten);
        } else {
          console.log(`Data Konten dengan id ${kontenId} tidak ada.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [kontenId]);

  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('UbahKonten', {kontenId});
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('konten')
        .doc(kontenId)
        .delete()
        .then(() => {
          console.log('Konten dihapus!');
        });
      if (dataKonten?.image) {
        const imageRef = storage().refFromURL(dataKonten?.image);
        await imageRef.delete();
      }
      console.log('Konten dihapus!');
      closeActionSheet();
      setdataKonten(null);
      setLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color="rgb(255, 161, 0)"
              variant="Linear"
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color="rgb(255, 161, 0)" />
        </View>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          contentContainerStyle={{}}>
          <FastImage
            style={styles.image}
            source={{
              uri: dataKonten?.image,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}></View>
          <Text style={styles.title}>{dataKonten?.title}</Text>
          <Text style={styles.content}>{dataKonten?.description}</Text>
          <Text style={styles.content}>{dataKonten?.origin}</Text>
          <Text style={styles.content}>{dataKonten?.conclusion}</Text>
        </Animated.ScrollView>
      )}
      <Animated.View
        style={[styles.bottomBar, {transform: [{translateY: bottomBarY}]}]}>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back color={colors.black()} variant="Linear" size={24} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Ubah
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Hapus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Kembali
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};
export default DetailKonten;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
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
