import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Avatar,
  CariDokter,
  InfoObat,
  RiwayatPenyakit,
  LayananKesehatan,
  TelfonSOS,
} from '../../../../assets/images';
import colors from '../../../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const Home = props => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onChangeSearch = query => setSearchQuery(query);
  const containerStyle = {
    width: 300,
    height: 100,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
  };
  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        console.log('running');
        const jsonValue = await AsyncStorage.getItem('UserProfile');
        await setData(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue));
        await setIsLoading(false);
      } catch (e) {
        //   error reading value
        console.log(e);
      }
    });
  }, [navigation]);
  console.log(data);

  const LayananUtama = [
    {
      id: 1,
      request: 'Develop',
      title: 'Riwayat Penyakit',
      image: RiwayatPenyakit,
    },
    {
      id: 2,
      request: 'Info Obat',
      title: 'Info Obat',
      image: InfoObat,
    },
    {
      id: 3,
      request: 'Develop',
      title: 'Cari Dokter',
      image: CariDokter,
    },
    {
      id: 4,
      request: 'Layanan Kesehatan',
      title: 'Layanan Kesehatan',
      image: LayananKesehatan,
    },
  ];
  const displayLayanan = () => {
    return LayananUtama.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            props.navigation.navigate(item.request, {request: item.request});
          }}>
          <View
            style={{
              width: 145,
              height: 145,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.soft_gray,
              borderRadius: 10,
              marginVertical: 5,
            }}>
            <Image
              source={item.image}
              style={{width: 60, height: 60, resizeMode: 'contain'}}
            />
            <Text style={{fontFamily: 'Karla-Bold'}}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <StatusBar
          translucent
          backgroundColor="white"
          barStyle="dark-content"
        />
        {/* header home */}
        <View style={styles.header}>
          {/* emergency call */}
          <View style={styles.headerItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SosScreen');
              }}>
              <Image
                source={TelfonSOS}
                style={{marginVertical: 10, width: 22, height: 40}}
              />
            </TouchableOpacity>
          </View>
          {/* Avatar */}
          <View style={styles.headerItem}>
            <Image
              source={Avatar}
              style={{alignSelf: 'center', marginVertical: 2}}></Image>
          </View>
          {/* location */}
          <View
            style={{
              height: 50,
              width: 100,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: 'Karla-Regular',
                alignSelf: 'center',
                marginHorizontal: 2,
              }}>
              Mataram
            </Text>
            <Icon
              name="map-marker"
              style={{alignSelf: 'center', color: colors.yellow}}
              size={32}
            />
          </View>
        </View>

        {/* nama pengguna */}
        <View style={{alignSelf: 'center', marginVertical: 10}}>
          <Text style={{fontFamily: 'Karla-Regular', fontSize: 22}}>
            Hi, {props.route.params.first_name}!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchMedicine');
          }}>
          <View style={styles.searchBar}>
            <View style={{marginRight: 10}}>
              <AntDesign name="search1" size={20} color={colors.yellow} />
            </View>
            <View>
              <Text>Cari Produk Kesehatan</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Layanan Utama</Text>
        </View>
        <View style={styles.ItemLayananUtama}>{displayLayanan()}</View>
      </View>
    </ScrollView>
  );
};

export default Home;
const windowWidth = Dimensions.get('screen').width;
const radius_size = 15;
const button_height = 50;
const width_button = windowWidth - 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginVertical: 50,
    marginHorizontal: 30,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  CaroselHome: {
    flex: 1,
    alignSelf: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerItem: {
    height: 50,
    width: 100,
  },
  slider: {
    marginVertical: 51,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 150,
    width: wp('80%'),
    backgroundColor: colors.soft_gray,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 14,
  },
  ItemLayananUtama: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
    height: 330,
  },
  iconEmergency: {
    width: 50,
    height: 50,
  },
  form: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 10,
    borderColor: colors.yellow,
    borderRadius: 10,
    paddingVertical: 2,
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  InputText: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    color: colors.black,
  },
  buttonMasuk: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: button_height,
    borderTopLeftRadius: radius_size,
    borderTopRightRadius: radius_size,
    borderBottomLeftRadius: radius_size,
    borderBottomRightRadius: radius_size,
  },
  buttonMasukDisable: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: colors.gray,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: button_height,
    borderTopLeftRadius: radius_size,
    borderTopRightRadius: radius_size,
    borderBottomLeftRadius: radius_size,
    borderBottomRightRadius: radius_size,
  },
  buttonTextMasuk: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: colors.white,
  },
  buttonTextMasukDisable: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: colors.white,
  },
  other: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
