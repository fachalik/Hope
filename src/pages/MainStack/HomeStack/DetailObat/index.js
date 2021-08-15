/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../../../config';
import colors from '../../../../assets/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import LoadingV2 from '../../../../components/Universal/LoadingV2';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import MainLayout from '../../../../components/MainLayout';
import ActionSheet from 'react-native-actions-sheet';

const DetailObat = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const [detail, setDetail] = useState({
    name: '',
    harga: '',
    deskrips: '',
    manfaat: '',
    komposisi: '',
    dosis: '',
    penyajian: '',
    efekSamping: '',
    produsen: '',
    perhatian: '',
  });

  const DetailItem = createRef();

  const handleSnap = async item => {
    setDetail({
      ...data,
      name: item.name,
      harga: item.price_range,
      deskripsi: item.description,
      manfaat: item.benefits,
      komposisi: item.composition,
      dosis: item.dosage,
      penyajian: item.serving,
      efekSamping: item.side_effect,
      produsen: item.producer,
      perhatian: item.consideration,
    });
    DetailItem.current?.setModalVisible();
  };

  useEffect(async () => {
    setIsLoading(true);
    var userToken = await AsyncStorage.getItem('userToken');
    const RefreshToken = await AsyncStorage.getItem('RefreshToken');
    await console.log(RefreshToken + ' refresh');
    await axios
      .post(config.API_URL + 'auth/login/refresh/', {
        refresh: RefreshToken,
      })
      .then(function (response) {
        // console.log(response.data);
        console.log(response.data);
        AsyncStorage.setItem('userToken', response.data.access);
        userToken = response.data.access;
      })
      .catch(function (error) {
        console.log(error);
      });
    await axios
      .get(config.API_URL + 'medicine/?kind=' + route.params.request, {
        headers: {Authorization: 'Bearer ' + userToken},
      })
      .then(function (response) {
        console.log(response.data);
        setIsData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    await setIsLoading(false);
  }, [null]);

  const Obat = () => {
    return data.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            handleSnap(item);
          }}
          style={{marginBottom: 30, marginHorizontal: 20, textAlign: 'center'}}>
          <View
            style={{
              width: 120,
              height: 120,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.backgroundColor,
              borderRadius: 150 / 2,
              marginVertical: 10,
              shadowColor: '#E3CFBD',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}>
            <FastImage
              source={{uri: item.image}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                resizeMode: 'cover',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Karla-Bold',
                fontSize: 10,
                textAlign: 'center',
                width: 100,
              }}>
              {item.name}
            </Text>
            <Text style={{fontFamily: 'Karla-Bold', fontSize: 10}}>
              {item.price_range}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <>
      <ActionSheet gestureEnabled={true} ref={DetailItem}>
        <View style={{marginHorizontal: 30}}>
          <Text style={styles.bigTitle}>{detail.name}</Text>
          <Text style={styles.title}>Harga</Text>
          <Text style={styles.contents}>{detail.harga}</Text>
          <Text style={styles.title}>Deskripsi</Text>
          <Text style={styles.contents}>{detail.deskripsi}</Text>
          <Text style={styles.title}>Manfaat</Text>
          <Text style={styles.contents}>{detail.manfaat}</Text>
          <Text style={styles.title}>Komposisi</Text>
          <Text style={styles.contents}>{detail.komposisi}</Text>
          <Text style={styles.title}>Dosis</Text>
          <Text style={styles.contents}>{detail.dosis}</Text>
          <Text style={styles.title}>Penyajian</Text>
          <Text style={styles.contents}>{detail.penyajian}</Text>
          <Text style={styles.title}>Efek Samping</Text>
          <Text style={styles.contents}>{detail.efekSamping}</Text>
          <Text style={styles.title}>Produsen</Text>
          <Text style={styles.contents}>{detail.produsen}</Text>
          <Text style={styles.title}>Perhatian</Text>
          <Text style={styles.contents}>{detail.perhatian}</Text>
        </View>
      </ActionSheet>
      <MainLayout boolean={isLoading}>
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
        <Text style={{fontFamily: 'Karla-Bold'}}>Pilihan produk kesehatan</Text>
        <View style={styles.itemObat}>{!isLoading ? <Obat /> : null}</View>
      </MainLayout>
    </>
  );
};

export default DetailObat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
  itemObat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  header: {
    backgroundColor: colors.gray,
    shadowRadius: 2,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
  },
  contents: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bigTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.gray,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});
