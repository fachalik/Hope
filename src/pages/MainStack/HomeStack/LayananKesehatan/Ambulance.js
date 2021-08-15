/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import colors from '../../../../assets/colors';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../../../config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainLayout from '../../../../components/MainLayout';

const Ambulance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const ListAmbulance = () => {
    return data.map(item => {
      return (
        <View>
          <View
            style={{
              width: wp('40%'),
              height: hp('20%'),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: 4,
              backgroundColor: colors.backgroundColor,
              marginVertical: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              elevation: 2,
            }}>
            <Text
              style={{
                fontFamily: 'Karla-Bold',
                fontSize: 14,
                textAlign: 'center',
                width: 120,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Karla-Bold',
                fontSize: 12,
                textAlign: 'center',
                width: 100,
              }}>
              {item.location}
            </Text>
            <Text style={{fontFamily: 'Karla-Regular', fontSize: 12}}>
              {item.phone_number}
            </Text>
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                Linking.openURL(`tel:${item.phone_number}`);
              }}
              style={{
                marginTop: 10,
                borderRadius: 4,
                backgroundColor: colors.backgroundColor,
                borderWidth: 1,
                borderColor: colors.orange,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontSize: 10,
                  fontFamily: 'Poppins-Medium',
                }}>
                Hubungi Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
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
      .get(config.API_URL + 'ambulance/', {
        headers: {Authorization: 'Bearer ' + userToken},
      })
      .then(function (response) {
        // console.log(response.data);
        setIsData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    await setIsLoading(false);
  }, [null]);
  console.log(data);
  return (
    <MainLayout boolean={isLoading}>
      <View style={styles.itemAmbulance}>
        {!isLoading ? <ListAmbulance /> : null}
      </View>
    </MainLayout>
  );
};

export default Ambulance;

const styles = StyleSheet.create({
  itemAmbulance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
});
