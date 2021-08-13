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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MainLayout from '../../../../components/MainLayout';
import {IconAvatar} from '../../../../assets';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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

  const LayananLainnya = [
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
  const displayLayananLainnya = () => {
    return LayananLainnya.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            props.navigation.navigate(item.request, {request: item.request});
          }}>
          <View style={styles.imageDisplay2}>
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

  const LayananUtama = [
    {
      id: 1,
      request: 'ChatBot',
      title: 'Chat HOPE',
      image: RiwayatPenyakit,
    },
    {
      id: 2,
      request: 'Develop',
      title: 'Chat Dokter',
      image: RiwayatPenyakit,
    },
    {
      id: 3,
      request: 'Develop',
      title: 'Chat Psikolog',
      image: RiwayatPenyakit,
    },
  ];
  const displayLayananUtama = () => {
    return LayananUtama.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            props.navigation.navigate(item.request, {request: item.request});
          }}>
          <View style={styles.imageDisplay}>
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
    <MainLayout>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconAvatar height="50" width="50" />
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleRegular}>Hi, </Text>
            <Text style={styles.headerTitleBold}>
              {props.route.params.first_name +
                ' ' +
                props.route.params.last_name}
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerTitle}>Mataram</Text>
          <MaterialIcon name="location-on" size={24} color={colors.orange} />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchMedicine');
        }}>
        <View style={styles.searchBar}>
          <View style={{marginRight: 10}}>
            <Icon name="search1" size={20} color={colors.gray} />
          </View>
          <View>
            <Text>Cari Obatmu!</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.TitleFont}>Layanan Utama</Text>
      <View style={styles.ItemLayananUtama}>{displayLayananUtama()}</View>
      <Text style={styles.TitleFont}>Layanan Lainnya</Text>
      <View style={styles.ItemLayananUtama}>
        <ScrollView
          style={{height: 130}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {displayLayananLainnya()}
        </ScrollView>
      </View>
      <Text style={styles.TitleFont}>Tentang Kami</Text>
    </MainLayout>
  );
};

export default Home;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerTitleBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  headerTitleRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  headerTitleEmail: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  imageDisplay: {
    width: 115,
    height: 115,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#E3CFBD',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  imageDisplay2: {
    width: 100,
    height: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 5,
    shadowColor: '#E3CFBD',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  IconSize: {
    width: 20,
    height: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 4,
    marginVertical: 20,
  },
  TitleFont: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  ItemLayananUtama: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
    height: 140,
  },
});