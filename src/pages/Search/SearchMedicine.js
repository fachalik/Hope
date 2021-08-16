import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import colors from '../../assets/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'react-native-axios';
import config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SearchMedicine = ({navigation}) => {
  const [data, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({
    text: '',
    checkQuery: false,
  });

  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        await setIsLoading(true);
        var userToken = await AsyncStorage.getItem('userToken');
        const RefreshToken = await AsyncStorage.getItem('RefreshToken');

        await axios
          .post(config.API_URL + 'auth/login/refresh/', {
            refresh: RefreshToken,
          })
          .then(function (response) {
            AsyncStorage.setItem('userToken', response.data.result.access);
            userToken = response.data.result.access;
          })
          .catch(function (error) {
            console.log(error);
          });
        await axios
          .get(config.API_URL + 'medicine/', {
            headers: {Authorization: 'Bearer ' + userToken},
          })
          .then(function (response) {
            setIsData(response.data.result);
          })
          .catch(function (error) {
            console.log(error);
          });
        await setIsLoading(false);
      } catch (e) {
        //   error reading value
        console.log(e);
      }
    });
  }, [navigation]);
  const textInputchangeQuery = async val => {
    if (val.length != 0) {
      await setQuery({
        ...query,
        text: val,
        checkQuery: true,
      });
    } else {
      setQuery({
        ...query,
        text: val,
        checkQuery: false,
      });
    }
  };
  const handleEmptyQuery = async () => {
    await setQuery({
      text: '',
      checkQuery: false,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.ViewInput}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon name="arrowleft" size={20} color={colors.yellow} />
          </TouchableOpacity>
          <TextInput
            style={styles.InputText}
            placeholder="Cari produk kesehatan"
            placeholderTextColor="grey"
            keyboardType="email-address"
            autoCapitalize="none"
            value={query.text}
            onChangeText={val => textInputchangeQuery(val)}
          />
          {query.checkQuery ? (
            <TouchableOpacity onPress={() => handleEmptyQuery()}>
              <Icon name="close" size={20} color={colors.yellow} />
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView style={{marginTop: 10, height: hp('80%')}}>
          {!isLoading ? (
            query.text != '' ? (
              data
                .filter(medicine => {
                  if (query.text == '') {
                    return medicine;
                  } else if (
                    medicine.name
                      .toLowerCase()
                      .includes(query.text.toLocaleLowerCase())
                  ) {
                    return medicine;
                  }
                })
                .map(medicine => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailSearchMedicine', {
                          request: medicine,
                        })
                      }>
                      <View style={styles.ViewSearch} key={medicine.ID}>
                        <Image
                          source={{uri: medicine.image}}
                          style={{width: 50, height: 50, marginRight: 10}}
                        />
                        <View style={{width: wp('60%'), alignSelf: 'center'}}>
                          <Text style={{fontSize: 12}}>{medicine.name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
            ) : null
          ) : (
            <ActivityIndicator color={'black'} size="large" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchMedicine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
  ViewSearch: {
    flexDirection: 'row',
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 20,
    borderColor: colors.yellow,
    borderRadius: 10,
    paddingVertical: 2,
  },
  InputText: {
    flex: 1,
    alignItems: 'center',
    width: 270,
    height: 40,
    paddingHorizontal: 10,
    color: colors.black,
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
