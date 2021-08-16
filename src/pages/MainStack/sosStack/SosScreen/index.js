/* eslint-disable react-hooks/exhaustive-deps */
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
  const [data, setData] = useState({
    noTem: '',
    noOrtu: '',
    noAmbulans: '',
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    navigation.addListener('focus', async () => {
      loadData();
    });
  }, []);
  const loadData = async () => {
    try {
      const nomerTeman = await AsyncStorage.getItem('NoTeman');
      const nomerOrangTua = await AsyncStorage.getItem('NoOrtu');
      const nomerAmbulans = await AsyncStorage.getItem('NoAmbulans');
      await setData({
        ...data,
        noTem: nomerTeman,
        noOrtu: nomerOrangTua,
        noAmbulans: nomerAmbulans,
      });
    } catch (e) {
      //   error reading value
      console.log(e);
    }
  };
  return (
    <MainLayout>
      <View style={styles.Header}>
        <Text style={styles.headerText}>SOS</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InputNoTelp');
          }}>
          <Icon name="questioncircleo" size={22} color={colors.gray} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.Text}>
          <Text style={styles.headerText}>Bantuan darurat diperlukan?</Text>
          <Text style={styles.titleText}>Klik pilihan dibawah ini</Text>
        </View>
        <View style={styles.ButtonCard}>
          <View style={styles.ItemLayananUtama}>
            <View style={styles.itemSos}>
              <TouchableOpacity
                onPress={() => {
                  data.noTem === '' ||
                  data.noTem === null ||
                  data.noTem === undefined
                    ? navigation.navigate('InputNoTelp')
                    : Linking.openURL(`tel:${data.noTem}`);
                }}>
                <Image style={styles.iconEmergency} source={Teman} />
                <Text style={styles.titleItem}>Hubungi Teman</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemSos}>
              <TouchableOpacity
                onPress={() => {
                  data.noOrtu === '' ||
                  data.noOrtu === null ||
                  data.noOrtu === undefined
                    ? navigation.navigate('InputNoTelp')
                    : Linking.openURL(`tel:${data.noOrtu}`);
                }}>
                <Image style={styles.iconEmergency} source={OrangTua} />
                <Text style={styles.titleItem}>Hubungi Orang Tua</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemSos}>
              <TouchableOpacity
                onPress={() => {
                  data.noAmbulans === '' ||
                  data.noAmbulans === null ||
                  data.noAmbulans === undefined
                    ? navigation.navigate('InputNoTelp')
                    : Linking.openURL(`tel:${data.noAmbulans}`);
                }}>
                <Image style={styles.iconEmergency} source={Ambulance} />
                <Text style={styles.titleItem}>Hubungi Ambulans</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemSos}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${'112'}`);
                }}>
                <Image style={styles.iconEmergency} source={SOS} />
                <Text style={styles.titleItem}>SOS</Text>
              </TouchableOpacity>
            </View>
          </View>
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
