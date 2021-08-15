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
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainLayout from '../../../../components/MainLayout';
const InputNoTelp = ({navigation}) => {
  const [data, setData] = useState({
    noTeman: '',
    noOrtu: '',
    noAmbulans: '',
    noTemanIsEmpty: true,
    noOrtuIsEmpty: true,
    noAmbulansIsEmpty: true,
    noTemanActive: false,
    noOrtuActive: false,
    noAmbulansActive: false,
  });
  const handleNoteman = val => {
    if (val.length != 0) {
      setData({
        ...data,
        noTeman: val,
        noTemanIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        noTeman: val,
        noTemanIsEmpty: false,
      });
    }
  };

  const handleNoOrtu = val => {
    if (val.length != 0) {
      setData({
        ...data,
        noOrtu: val,
        noOrtuIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        noOrtu: val,
        noOrtuIsEmpty: false,
      });
    }
  };

  const handleAmbulans = val => {
    if (val.length != 0) {
      setData({
        ...data,
        noAmbulans: val,
        noAmbulansIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        noAmbulans: val,
        noAmbulansIsEmpty: false,
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
    <MainLayout>
      <Text style={styles.title}>Nomor Darurat</Text>
      <Text style={styles.text}>Masukkan nomor yang sesuai</Text>
      <View style={styles.asd}>
        <View style={styles.separator}>
          <View style={styles.form}>
            {/* // Input Form for Nomor Orang Tua */}
            <View style={styles.TextInput}>
              <Text style={styles.TextInputFont}>Nomor Orang Tua</Text>
            </View>
            <View
              style={styles.ViewInput(
                data.noOrtuIsEmpty,
                null,
                data.noOrtuActive,
              )}>
              <Text>+62</Text>
              <TextInput
                style={styles.InputText}
                onFocus={() => setData({...data, noOrtuActive: true})}
                onBlur={() => setData({...data, noOrtuActive: false})}
                placeholder="8XX XXXX XXXX"
                placeholderTextColor="grey"
                keyboardType="number-pad"
                onChangeText={val => handleNoOrtu(val)}
                maxLength={11}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ContactList');
                }}>
                <Icon name="contacts" size={24} />
              </TouchableOpacity>
            </View>

            {/* // Input Form for Nomor Teman */}
            <View style={styles.TextInput}>
              <Text style={styles.TextInputFont}>Nomor Teman</Text>
            </View>
            <View
              style={styles.ViewInput(
                data.noTemanIsEmpty,
                null,
                data.noTemanActive,
              )}>
              <Text>+62</Text>
              <TextInput
                style={styles.InputText}
                onFocus={() => setData({...data, noTemanActive: true})}
                onBlur={() => setData({...data, noTemanActive: false})}
                placeholder="8XX XXXX XXXX"
                placeholderTextColor="grey"
                keyboardType="number-pad"
                onChangeText={val => handleNoteman(val)}
                maxLength={11}
              />
              <TouchableOpacity
                onPress={() => {
                  alert('open phone book');
                }}>
                <Icon name="contacts" size={24} />
              </TouchableOpacity>
            </View>

            {/* // Input Form for Nomor Ambulans */}
            <View style={styles.TextInput}>
              <Text style={styles.TextInputFont}>Nomor Ambulans</Text>
            </View>
            <View
              style={styles.ViewInput(
                data.noAmbulansIsEmpty,
                null,
                data.noAmbulansActive,
              )}>
              <TextInput
                style={styles.InputText}
                onFocus={() => setData({...data, noAmbulansActive: true})}
                onBlur={() => setData({...data, noAmbulansActive: false})}
                placeholderTextColor="grey"
                keyboardType="number-pad"
                maxLength={11}
                onChangeText={val => handleAmbulans(val)}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={
              !data.noOrtuIsEmpty &&
              !data.noTemanIsEmpty &&
              !data.noAmbulansIsEmpty
                ? false
                : true
            }
            onPress={() => {
              // loginHandle(data.email, data.katasandi);
            }}>
            <View
              style={
                !data.noOrtuIsEmpty &&
                !data.noTemanIsEmpty &&
                !data.noAmbulansIsEmpty
                  ? styles.buttonMasuk
                  : styles.buttonMasukDisable
              }>
              <Text style={styles.buttonTextMasuk}>TERAPKAN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default InputNoTelp;
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
  text: {
    fontFamily: 'Karla-SemiBold',
    fontSize: 16,
    color: colors.gray,
  },
  form: {
    marginVertical: 10,
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  TextInputFont: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
  },
  InputText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    width: 300,
    color: colors.black,
  },
  InputWarning: {
    marginTop: 5,
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    color: colors.warning,
  },
  ViewInput: (condition, condition2, active) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor:
      condition || condition2
        ? colors.warning
        : active
        ? colors.orange
        : colors.gray,
    borderRadius: 4,
    paddingVertical: 2,
  }),
  buttonMasuk: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.orange,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 4,
  },
  buttonMasukDisable: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.gray,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 4,
  },
  buttonTextMasuk: {
    fontSize: 16,
    fontFamily: 'Karla-Bold',
    color: colors.white,
  },
  separator: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});
