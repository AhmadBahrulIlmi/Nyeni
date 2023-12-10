import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Add, GalleryAdd, ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import {Category} from '../../../data';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';

const TambahKonten = () => {
  const navigation = useNavigation();
  const dataCategory = Category;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 1080,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpload = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`kontenimages/${filename}`);

    setLoading(true);
    try {
      await reference.putFile(image);
      const url = await reference.getDownloadURL();
      await firestore().collection('konten').add({
        title: dataKonten.title,
        description: dataKonten.description,
        origin: dataKonten.origin,
        conclusion: dataKonten.conclusion,
        category: dataKonten.category,
        image: url,
      });
      setLoading(false);
      console.log('Konten berhasil ditambahkan!');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  const [dataKonten, setdataKonten] = useState({
    category: {},
    title: '',
    description: '',
    origin: '',
    conclusion: '',
    image: '',
  });
  const handleChange = (key, value) => {
    setdataKonten({
      ...dataKonten,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="rgb(255, 161, 0)" variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', paddingRight: 25}}>
          <Text style={{color: 'rgb(255, 161, 0)', fontSize: 15}}>
            Tambah Konten
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={[textInput.border]}>
          <TextInput
            placeholder="Judul"
            value={dataKonten.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.3)}
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.border, {minHeight: 100}]}>
          <TextInput
            placeholder="Deskripsi"
            value={dataKonten.description}
            onChangeText={text => handleChange('description', text)}
            placeholderTextColor={colors.grey(0.3)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.border, {minHeight: 100}]}>
          <TextInput
            placeholder="Asal Usul"
            value={dataKonten.origin}
            onChangeText={text => handleChange('origin', text)}
            placeholderTextColor={colors.grey(0.3)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.border, {minHeight: 100}]}>
          <TextInput
            placeholder="Kesimpulan"
            value={dataKonten.conclusion}
            onChangeText={text => handleChange('conclusion', text)}
            placeholderTextColor={colors.grey(0.3)}
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.border]}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontType['Pjs-Regular'],
              color: colors.black(0.5),
            }}>
            Kategori
          </Text>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === dataKonten.category.id
                  ? 'rgb(255, 161, 0)'
                  : colors.grey(0.08);
              const color =
                item.id === dataKonten.category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', {id: item.id, name: item.name})
                  }
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {image ? (
          <View style={{position: 'relative'}}>
            <FastImage
              style={{width: '100%', height: 127, borderRadius: 10}}
              source={{
                uri: image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'rgb(255, 161, 0)',
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={colors.white()}
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.content,
                {
                  gap: 10,
                  paddingVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <GalleryAdd color={colors.grey(0.6)} variant="Linear" size={30} />
              <Text
                style={{
                  fontFamily: fontType['Pjs-Regular'],
                  fontSize: 12,
                  color: colors.grey(0.6),
                }}>
                Tambah Gambar
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="rgb(255, 161, 0)" />
        </View>
      )}
    </View>
  );
};

export default TambahKonten;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: colors.white(),
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgb(255, 161, 0)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const textInput = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
  image: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
  border: {
    borderWidth: 1,
    padding: 10,
    borderColor: colors.grey(0.4),
    borderRadius: 10,
    backgroundColor: colors.white(),
  },
});

const category = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  categoryName: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  },
});
