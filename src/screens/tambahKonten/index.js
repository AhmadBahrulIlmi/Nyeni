import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ArrowLeft} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../theme';
import {CategoryList} from '../../../data';

const TambahKonten = () => {
  const navigation = useNavigation();
  const dataCategory = CategoryList;
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
  const [image, setImage] = useState(null);
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
        <View style={[textInput.border, {minHeight: 200}]}>
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
            placeholder="Asal"
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
                  <Text style={[category.categoryName, {color: color}]}>
                    {item.categoryName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
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
