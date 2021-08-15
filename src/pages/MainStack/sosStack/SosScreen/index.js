import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import colors from '../../../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../../../components/MainLayout';
import {Teman, OrangTua, Ambulance, SOS} from '../../../../assets';
const SosScreen = ({navigation}) => {
  // const [noTeman, setNoTeman] = useState('');
  // const [noOrtu, setNoOrtu] = useState('');
  // useEffect(() => {
  //   navigation.addListener('focus', async () => {
  //     try {
  //       const nomerTeman = await AsyncStorage.getItem('NoTeman');
  //       await setNoTeman(nomerTeman);
  //       const nomerOrangTua = await AsyncStorage.getItem('NoOrtu');
  //       await setNoOrtu(nomerOrangTua);
  //     } catch (e) {
  //       //   error reading value
  //       console.log(e);
  //     }
  //   });
  // }, [navigation]);
  // console.log(noTeman, noOrtu);
  const items = [
    {
      id: 1,
      source: Teman,
      title: 'Hubungi Teman',
      number: 'none',
    },
    {
      id: 2,
      source: Ambulance,
      title: 'Hubungi Ambulans',
      number: 'none',
    },
    {
      id: 3,
      source: OrangTua,
      title: 'Hubungi Orang Tua',
      number: 'none',
    },
    {
      id: 4,
      source: SOS,
      title: 'SOS',
      number: '112',
    },
  ];
  const itemSOS = () => {
    return items.map(item => {
      return (
        <View style={styles.itemSos} id={item.id}>
          {item.number === 'none' ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InputNoTelp');
              }}>
              <Image style={styles.iconEmergency} source={item.source} />
              <Text style={styles.titleItem}>{item.title}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item.number}`);
              }}>
              <Image style={styles.iconEmergency} source={item.source} />
              <Text style={styles.titleItem}>{item.title}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };
  return (
    <MainLayout>
      <View style={styles.Header}>
        <Text style={styles.headerText}>SOS</Text>
        <Icon name="questioncircleo" size={22} color={colors.gray} />
      </View>
      <View style={styles.content}>
        <View style={styles.Text}>
          <Text style={styles.headerText}>Bantuan darurat diperlukan?</Text>
          <Text style={styles.titleText}>Klik pilihan dibawah ini</Text>
        </View>
        <View style={styles.ButtonCard}>
          <View style={styles.ItemLayananUtama}>{itemSOS()}</View>
        </View>
      </View>
    </MainLayout>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 29,
    textAlign: 'center',
  },
  titleText: {
    fontFamily: 'Karla-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray,
    marginVertical: 10,
  },
  titleItem: {
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    textAlign: 'center',
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  Text: {
    marginVertical: 50,
  },
  iconEmergency: {
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  ItemLayananUtama: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemSos: {
    width: wp('40%'),
    height: hp('15%'),
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: colors.backgroundColor,
  },
});
