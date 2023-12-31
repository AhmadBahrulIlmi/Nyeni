import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {fontType, colors} from '../../theme';
import {
  NotificationBing,
  Setting2,
  BookSaved,
  ArrowRotateLeft,
  Setting,
  Logout,
  AddSquare,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const user = auth().currentUser;
    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
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
      </View>
      <View style={styles.containerProfil}>
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/D4E03AQFQ-YNoTb76lQ/profile-displayphoto-shrink_800_800/0/1681642465471?e=1704326400&v=beta&t=DRI-STPPSoMPbOQVQhueEHkrF7Q6iXSNg4OQDtJAfho',
          }}
          style={styles.profileImage}/>
        <Text style={styles.name}>{profileData?.fullName}</Text>
        <Text style={styles.email}>{profileData?.email}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profil</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 30}}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('TambahKonten')}>
          <View
            style={{
              ...styles.menuContainer,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <AddSquare color="rgb(255, 161, 0)" size={20} />
            <Text style={styles.menuItemText}>Tambah Konten</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View
            style={{
              ...styles.menuContainer,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <BookSaved color="rgb(255, 161, 0)" size={20} />
            <Text style={styles.menuItemText}>Preferensi Bacaan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View
            style={{
              ...styles.menuContainer,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <ArrowRotateLeft color="rgb(255, 161, 0)" size={20} />
            <Text style={styles.menuItemText}>Riwayat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View
            style={{
              ...styles.menuContainer,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Setting color="rgb(255, 161, 0)" size={20} />
            <Text style={styles.menuItemText}>Pengaturan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <View
            style={{
              ...styles.menuContainer,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Logout color="rgb(255, 161, 0)" size={20} />
            <Text style={styles.menuItemText}>Keluar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  containerProfil: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(255, 161, 0)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
  },
});
