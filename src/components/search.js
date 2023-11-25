import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SearchNormal1, CloseCircle} from 'iconsax-react-native';
import {fontType, colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

const SearchBar = ({searchPhrase, setSearchPhrase}) => {
  const navigation = useNavigation();
  const [showCancel, setShowCancel] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleCancelPress = () => {
    setSearchPhrase('');
    setShowCancel(false);
  };

  return (
    <Animated.View style={styles.container}>
      <View style={styles.bgSearch}>
        <SearchNormal1
          size={18}
          color={searchPhrase ? colors.black() : colors.grey(0.5)}
          variant="Linear"
        />
        <TextInput
          style={styles.textinput}
          placeholder="Cari Konten"
          placeholderTextColor={colors.grey(0.5)}
          value={searchPhrase}
          onChangeText={text => {
            setSearchPhrase(text);
            setShowCancel(text.length > 0);
          }}
          autoCorrect={false}
          autoFocus={true}
        />
        {showCancel && (
          <TouchableOpacity onPress={handleCancelPress}>
            <CloseCircle size={18} color={colors.black()} variant="Linear" />
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={{opacity: animation}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bgSearch: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    height: 45,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgb(240, 240, 240)',
    justifyContent: 'space-between',
    flex: 1,
    marginEnd: 10,
  },
  textinput: {
    fontSize: 15,
    fontFamily: fontType['Pjs-Light'],
    color: colors.black(),
    lineHeight: 18,
    padding: 0,
    flex: 1,
  },
  cancelButton: {
    color: 'rgb(255, 161, 0)',
    fontSize: 15,
    fontFamily: fontType['Pjs-Medium'],
  },
});
