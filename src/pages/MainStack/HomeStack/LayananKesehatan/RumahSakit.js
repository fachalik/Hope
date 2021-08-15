/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
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

const RumahSakit = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const handleprops = item => {
    props.handleRumahSakit({
      name: item.name,
      notelp: item.phone_number,
      alamat: item.address,
      tentang: item.about,
      layanan: item.services,
      layananpoliklinik: item.polyclinics,
    });
    props.handletrigger();
  };
  const ListRumahSakit = () => {
    return data.map(item => {
      return (
        <TouchableOpacity key={item.name} onPress={() => handleprops(item)}>
          <View
            style={{
              width: wp('40%'),
              height: hp('20%'),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.soft_gray,
              borderRadius: 10,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Karla-Bold',
                fontSize: 10,
                textAlign: 'center',
                width: 100,
              }}>
              {item.name}
            </Text>
            <FastImage
              source={{uri: item.image}}
              style={{width: 100, height: 100, resizeMode: 'cover'}}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text style={{fontFamily: 'Karla-Bold', fontSize: 10}}>
              {item.price_range}
            </Text>
          </View>
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
    <View>
      {isLoading ? <ActivityIndicator color={'black'} size="large" /> : null}
      <View style={styles.itemRumahSakit}>
        {!isLoading ? <ListRumahSakit /> : null}
      </View>
    </View>
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
});
