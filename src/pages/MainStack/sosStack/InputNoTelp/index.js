import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../../../../assets/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const InputNoTelp = ({navigation}) => {
  const [data, setData] = useState({
    noTeman: '',
    noOrtu: '',
    noTemanIsEmpty: true,
    noOrtuIsEmpty: true,
  });
  const handleNoteman = val => {
    if (val.length != 0) {
      setData({
        ...data,
        noTeman: val,
        noTemanIsEmpty: false,
      });
    } else {
      setData({
        ...data,
        noTeman: val,
        noTemanIsEmpty: true,
      });
    }
  };

  const handleNoOrtu = val => {
    if (val.length != 0) {
      setData({
        ...data,
        noOrtu: val,
        noOrtuIsEmpty: false,
      });
    } else {
      setData({
        ...data,
        noOrtu: val,
        noOrtuIsEmpty: true,
      });
    }
  };

  const handleStoreNoTelp = async (noTeman, noOrtu) => {
    await AsyncStorage.setItem('NoTeman', '+62' + noTeman);
    await AsyncStorage.setItem('NoOrtu', '+62' + noOrtu);
    await alert('Nomer Telah Tersimpan');
    await navigation.pop();
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Input Nomer Telpon</Text>
        <Text style={styles.text}>
          Masukkan nomer telpon teman dan orang tua kamu
        </Text>
        <View style={styles.form}>
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Nomer Telpon Teman</Text>
          </View>
          <View style={styles.ViewInput}>
            <Icon name="mail" size={20} color={colors.yellow} />
            <Text style={{marginLeft: 10}}>+62</Text>
            <TextInput
              style={styles.InputText}
              placeholder="8XX-XXXX-XXXX"
              placeholderTextColor="grey"
              keyboardType="phone-pad"
              autoCapitalize="none"
              onChangeText={val => handleNoteman(val)}
            />
          </View>
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Nomer Orang Tua</Text>
          </View>
          <View style={styles.ViewInput}>
            <Icon name="mail" size={20} color={colors.yellow} />
            <Text style={{marginLeft: 10}}>+62</Text>
            <TextInput
              style={styles.InputText}
              placeholder="8XX-XXXX-XXXX"
              placeholderTextColor="grey"
              keyboardType="phone-pad"
              autoCapitalize="none"
              onChangeText={val => handleNoOrtu(val)}
            />
          </View>
        </View>
        <TouchableOpacity
          disabled={!data.noTemanIsEmpty && !data.noOrtuIsEmpty ? false : true}
          onPress={() => {
            handleStoreNoTelp(data.noTeman, data.noOrtu);
          }}>
          <View
            style={
              !data.noOrtuIsEmpty && !data.noTemanIsEmpty
                ? styles.buttonMasuk
                : styles.buttonMasukDisable
            }>
            <Text style={styles.buttonTextMasukDisable}>TAMBAH</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputNoTelp;
const windowWidth = Dimensions.get('screen').width;
const radius_size = 15;
const button_height = 50;
const width_button = windowWidth - 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
  form: {
    width: wp('80%'),
    height: hp('30%'),
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
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonMasuk: {
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: width_button,
    height: button_height,
    borderTopLeftRadius: radius_size,
    borderTopRightRadius: radius_size,
    borderBottomLeftRadius: radius_size,
    borderBottomRightRadius: radius_size,
  },
  buttonMasukDisable: {
    alignSelf: 'center',
    backgroundColor: colors.gray,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: width_button,
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
});
