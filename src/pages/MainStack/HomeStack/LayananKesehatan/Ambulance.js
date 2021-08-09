/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native';
import colors from '../../../../assets/colors';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../../../config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Ambulance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const ListAmbulance = () => {
    return data.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            Linking.openURL(`tel:${item.phone_number}`);
          }}>
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
          </View>
        </TouchableOpacity>
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
    <View>
      {isLoading ? <ActivityIndicator color={'black'} size="large" /> : null}
      <View style={styles.itemAmbulance}>
        {!isLoading ? <ListAmbulance /> : null}
      </View>
    </View>
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
