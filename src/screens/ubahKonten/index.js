import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import {Category} from '../../../data';
import axios from 'axios';

const UbahKonten = ({route}) => {
  const {kontenId} = route.params;
  const dataCategory = Category;
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
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getKontenById();
  }, [kontenId]);

  const getKontenById = async () => {
    try {
      const response = await axios.get(
        `https://6569991fde53105b0dd751f3.mockapi.io/nyeniapp/kontennyeni/${kontenId}`,
      );
      setdataKonten({
        title: response.data.judul,
        description: response.data.deskripsi,
        origin: response.data.asal,
        conclusion: response.data.kesimpulan,
        category: {
          id: response.data.kategori.id,
          name: response.data.kategori.name,
        },
      });
      setImage(response.data.image);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `https://6569991fde53105b0dd751f3.mockapi.io/nyeniapp/kontennyeni/${kontenId}`,
          {
            judul: dataKonten.title,
            deskripsi : dataKonten.description,
            asal : dataKonten.origin,
            kesimpulan : dataKonten.conclusion,
            kategori: dataKonten.category,
            image,
            content: dataKonten.content,
          },
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="rgb(255, 161, 0)" variant="Linear" size={24} />
        </TouchableOpacity>
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
          <TextInput
            placeholder="Gambar"
            value={image}
            onChangeText={text => setImage(text)}
            placeholderTextColor={colors.grey(0.3)}
            style={textInput.image}
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
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonLabel}>Update</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.blue()} />
        </View>
      )}
    </View>
  );
};

export default UbahKonten;

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
