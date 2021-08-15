/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../../../../assets/colors';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../../../config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import MainLayout from '../../../../components/MainLayout';
import ActionSheet from 'react-native-actions-sheet';

const RumahSakit = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const [detail, setDetail] = useState({
    name: '',
    notelp: '',
    alamat: '',
    tentang: '',
    layanan: '',
    layananpoliklinik: '',
  });
  const DetailRS = createRef();

  const handleSnap = async item => {
    setDetail({
      ...data,
      name: item.name,
      notelp: item.phone_number,
      alamat: item.address,
      tentang: item.about,
      layanan: item.services,
      layananpoliklinik: item.polyclinics,
    });
    DetailRS.current?.setModalVisible();
  };
  const ListRumahSakit = () => {
    return data.map(item => {
      return (
        <TouchableOpacity onPress={() => handleSnap(item)}>
          <View
            key={item.id}
            style={{
              width: 120,
              height: 120,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: 999,
              backgroundColor: colors.backgroundColor,
              marginVertical: 5,
            }}>
            <FastImage
              source={{uri: item.image}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 999,
                resizeMode: 'contain',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Karla-Bold',
              fontSize: 10,
              textAlign: 'center',
              width: 100,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  useEffect(async () => {
    await setIsLoading(true);
    var userToken = await AsyncStorage.getItem('userToken');
    const RefreshToken = await AsyncStorage.getItem('RefreshToken');
    // await console.log(RefreshToken + ' refresh');
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
      .get(config.API_URL + 'hospital/', {
        headers: {Authorization: 'Bearer ' + userToken},
      })
      .then(function (response) {
        // console.log(response.data);
        response.data.map(item => {
          setIsData(data => [...data, item]);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    await axios
      .get(config.API_URL + 'laboratory/', {
        headers: {Authorization: 'Bearer ' + userToken},
      })
      .then(function (response) {
        // console.log(response.data);
        response.data.map(item => {
          setIsData(data => [...data, item]);
        });
        console.log('laboratory ' + response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    await setIsLoading(false);
  }, [null]);

  console.log(data);
  return (
    <>
      <ActionSheet gestureEnabled={true} ref={DetailRS}>
        <View style={{marginHorizontal: 30}}>
          <Text style={styles.bigTitle}>{detail.name}</Text>
          <Text style={styles.title}>No. Telpon</Text>
          <Text style={styles.contents}>{detail.notelp}</Text>
          <Text style={styles.title}>Alamat</Text>
          <Text style={styles.contents}>{detail.alamat}</Text>
          <Text style={styles.title}>Tentang</Text>
          <Text style={styles.contents}>{detail.tentang}</Text>
          {detail.layanan === undefined ? null : (
            <Text style={styles.title}>Layanan</Text>
          )}
          {detail.layanan === undefined ? null : (
            <FlatList
              data={detail.layanan}
              key={detail.notelp}
              renderItem={({item}) => (
                <View style={styles.column}>
                  <View key={item} style={styles.row}>
                    <View style={styles.bullet}>
                      <Text>{'\u2022' + ' '}</Text>
                    </View>
                    <View style={styles.bulletText}>
                      <Text>
                        <Text style={styles.contents}>{item}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
          {detail.layananpoliklinik === undefined ? null : (
            <Text style={styles.title}>Layanan Poliklink</Text>
          )}
          {detail.layananpoliklinik === undefined ? null : (
            <FlatList
              data={detail.layananpoliklinik}
              key={detail.notelp}
              renderItem={({item}) => (
                <View style={styles.column}>
                  <View key={item} style={styles.row}>
                    <View style={styles.bullet}>
                      <Text>{'\u2022' + ' '}</Text>
                    </View>
                    <View style={styles.bulletText}>
                      <Text>
                        <Text style={styles.contents}>{item}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ActionSheet>
      <MainLayout boolean={isLoading}>
        <View style={styles.itemRumahSakit}>
          {!isLoading ? <ListRumahSakit /> : null}
        </View>
      </MainLayout>
    </>
  );
};

export default RumahSakit;

const styles = StyleSheet.create({
  itemRumahSakit: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  bigTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
