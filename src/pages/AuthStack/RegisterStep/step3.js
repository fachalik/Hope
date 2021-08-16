import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import color from '../../../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../../../components/Universal/BackButton';
import {AuthContext} from '../../../router/context';
import config from '../../../../config';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../../components/MainLayout';
import PasswordStrengthIndicator from '../../../components/Universal/PasswordStrengthIndicator';

const RegisterStep3 = ({navigation}) => {
  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });
  const [data, setData] = useState({
    namaDepan: '',
    namaDepanIsEmpty: false,
    namaDepanActive: false,

    namBelakang: '',
    namaBelakangIsEmpty: false,
    namaBelakangActive: false,

    email: '',
    emailIsEmpty: false,
    check_TextEmail: false,
    emailActive: false,

    katasandi: '',
    kataSandiIsEmpty: false,
    secureTextEntry: true,
    kataSandiActive: false,

    konfirmasiKatasandi: '',
    konfirmasiKataSandiIsEmpty: false,
    konfirmasiSecureTextEntry: true,
    konfirmasiPasswordActive: false,

    permission: false,
  });
  const {SignUp} = useContext(AuthContext);

  const textInputChangeNamaDepan = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        namaDepan: val,
        namaDepanIsEmpty: false,
      });
    } else {
      setData({
        ...data,
        namaDepan: val,
        namaDepanIsEmpty: true,
      });
    }
  };

  const textInputChangeNamaBelakang = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        namBelakang: val,
        namaBelakangIsEmpty: false,
      });
    } else {
      setData({
        ...data,
        namBelakang: val,
        namaBelakangIsEmpty: true,
      });
    }
  };

  const textInputChangeEmail = val => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        emailIsEmpty: true,
      });
      if (pattern.test(val)) {
        setData({
          ...data,
          email: val,
          check_TextEmail: false,
        });
      } else {
        setData({
          ...data,
          email: val,
          check_TextEmail: true,
        });
      }
    } else {
      setData({
        ...data,
        email: val,
        emailIsEmpty: false,
      });
    }
  };

  const handlePassword = val => {
    if (val.length > 7) {
      setData({
        ...data,
        katasandi: val,
        kataSandiIsEmpty: false,
      });
      setPasswordValidity({
        minChar: val.length >= 8 ? true : false,
        number: isNumberRegx.test(val) ? true : false,
        specialChar: specialCharacterRegx.test(val) ? true : false,
      });
    } else {
      setData({
        ...data,
        katasandi: val,
        passwordIsEmpty: true,
      });
      setPasswordValidity({
        minChar: val.length >= 8 ? true : false,
        number: isNumberRegx.test(val) ? true : false,
        specialChar: specialCharacterRegx.test(val) ? true : false,
      });
    }
  };

  const handleKonfirmasiPassword = (val, password) => {
    if (val === password) {
      setData({
        ...data,
        konfirmasiKatasandi: val,
        konfirmasiKataSandiIsEmpty: false,
      });
    } else {
      setData({
        ...data,
        konfirmasiKatasandi: val,
        konfirmasiKataSandiIsEmpty: true,
      });
    }
  };

  const updateSecureTextEntry = val => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntryKonfirmasi = val => {
    setData({
      ...data,
      konfirmasiSecureTextEntry: !data.konfirmasiSecureTextEntry,
    });
  };
  const RegisterHandle = async (
    firstName,
    lastName,
    email,
    password,
    ConfirmPassword,
  ) => {
    await console.log(firstName, lastName, email, password, ConfirmPassword);
    setIsLoading(true);
    //mergeItem to asyncstorage formstep1
    if (password !== ConfirmPassword) {
      setData({
        ...data,
        errorConfirmPassword: true,
      });
      setIsLoading(false);
    } else {
      setData({
        ...data,
        errorConfirmPassword: false,
      });
      try {
        let confirmSuccess;
        confirmSuccess = null;
        console.log(config.API_URL + 'auth/register');
        await axios
          .post(config.API_URL + 'auth/register', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            weight: 0,
            height: 0,
            job: '',
            activities: '',
            disease_history: '',
          })
          .then(async function (response) {
            await console.log(response.data);
            confirmSuccess = await response.data;
            await AsyncStorage.setItem('RegistComplete', 'true');
            Object.keys(confirmSuccess).length === 0 &&
            (confirmSuccess.constructor === Object) === ''
              ? null
              : navigation.navigate('RegistComplete');
          })
          .catch(async function (error) {
            ToastAndroid.show(error.response.data.error, ToastAndroid.LONG);
          });
        await SignUp(email, password, confirmSuccess);
      } catch (e) {
        //   error reading value
        console.log(e);
      }
      await setIsLoading(false);
    }
  };
  return (
    <MainLayout boolean={isLoading}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>Daftar Akun</Text>
      <Text style={styles.text}>Informasi umum</Text>
      <View style={styles.form}>
        {/* // Input Form for Nama Depan */}
        <View style={styles.TextInput}>
          <Text>Nama Depan</Text>
        </View>
        <View
          style={styles.ViewInput(
            data.namaDepanIsEmpty,
            null,
            data.namaDepanActive,
          )}>
          <TextInput
            style={styles.InputText}
            placeholder="Mohon masukkan nama depan anda"
            placeholderTextColor="grey"
            onFocus={() => setData({...data, namaDepanActive: true})}
            onBlur={() => setData({...data, namaDepanActive: false})}
            autoCapitalize="none"
            onChangeText={val => textInputChangeNamaDepan(val)}
          />
        </View>
        {data.namaDepanIsEmpty ? (
          <Text style={styles.InputWarning}>Nama depan harus diisi</Text>
        ) : null}

        {/* // Input Form for Nama Belakang */}
        <View style={styles.TextInput}>
          <Text>Nama Belakang</Text>
        </View>
        <View
          style={styles.ViewInput(
            data.namaBelakangIsEmpty,
            null,
            data.namaBelakangActive,
          )}>
          <TextInput
            style={styles.InputText}
            onFocus={() => setData({...data, namaBelakangActive: true})}
            onBlur={() => setData({...data, namaBelakangActive: false})}
            placeholder="Mohon masukkan nama belakang anda"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={val => textInputChangeNamaBelakang(val)}
          />
        </View>
        {data.namaBelakangIsEmpty ? (
          <Text style={styles.InputWarning}>Nama depan harus diisi</Text>
        ) : null}

        {/* // Input Form for Email */}
        <View style={styles.TextInput}>
          <Text>Email</Text>
        </View>
        <View
          style={styles.ViewInput(
            data.emailIsEmpty,
            data.check_TextEmail,
            data.emailActive,
          )}>
          <TextInput
            style={styles.InputText}
            onFocus={() => setData({...data, emailActive: true})}
            onBlur={() => setData({...data, emailActive: false})}
            placeholder="Mohon masukkan email anda"
            placeholderTextColor="grey"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={val => textInputChangeEmail(val)}
          />
        </View>
        {data.emailIsEmpty ? (
          <Text style={styles.InputWarning}>Email harus diisi</Text>
        ) : null}
        {data.check_TextEmail ? (
          <Text style={styles.InputWarning}>
            Email tidak sesuai dengan format
          </Text>
        ) : null}

        {/* // Input Form for kata sandi */}
        <View style={styles.TextInput}>
          <Text>Kata Sandi</Text>
        </View>
        <View
          style={styles.ViewInput(
            data.kataSandiIsEmpty,
            null,
            data.kataSandiActive,
          )}>
          <TextInput
            style={styles.InputText}
            onFocus={() => setData({...data, kataSandiActive: true})}
            onBlur={() => setData({...data, kataSandiActive: false})}
            placeholder="Mohon masukkan kata sandi anda"
            placeholderTextColor="grey"
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={val => handlePassword(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" size={20} color="grey" />
            ) : (
              <Feather name="eye" size={20} color={color.orange} />
            )}
          </TouchableOpacity>
        </View>
        {data.kataSandiIsEmpty ? (
          <Text style={styles.InputWarning}>Kata sandi harus diisi</Text>
        ) : null}
        {data.kataSandiActive && (
          <PasswordStrengthIndicator validity={passwordValidity} />
        )}
        {/* // Input Form for konfirmasi kata sandi */}
        <View style={styles.TextInput}>
          <Text>Konfirmasi kata Sandi</Text>
        </View>
        <View
          style={styles.ViewInput(
            data.konfirmasiKataSandiIsEmpty,
            null,
            data.konfirmasiPasswordActive,
          )}>
          <TextInput
            style={styles.InputText}
            onFocus={() => setData({...data, konfirmasiPasswordActive: true})}
            onBlur={() => setData({...data, konfirmasiPasswordActive: false})}
            placeholder="Mohon masukkan konfirmasi kata sandi anda"
            placeholderTextColor="grey"
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={val => handleKonfirmasiPassword(val, data.katasandi)}
          />
          <TouchableOpacity onPress={updateSecureTextEntryKonfirmasi}>
            {data.konfirmasiSecureTextEntry ? (
              <Feather name="eye-off" size={20} color="grey" />
            ) : (
              <Feather name="eye" size={20} color={color.orange} />
            )}
          </TouchableOpacity>
        </View>
        {data.konfirmasiKataSandiIsEmpty ? (
          <Text style={styles.InputWarning}>
            Konfirmasi kata sandi harus diisi
          </Text>
        ) : null}

        <View style={styles.coloumn}>
          <TouchableOpacity
            style={styles.checkBox(data.permission)}
            onPress={() => setData({...data, permission: !data.permission})}
          />
          <Text style={styles.permissioNormal}>
            Saya menyetujui{' '}
            <Text style={styles.permissioActive}>Syarat ketentuan </Text>
            Hope
          </Text>
        </View>

        <TouchableOpacity
          disabled={
            !data.namaDepanIsEmpty &&
            !data.namaBelakangIsEmpty &&
            !data.emailIsEmpty &&
            !data.kataSandiIsEmpty &&
            !data.konfirmasiKataSandiIsEmpty &&
            data.permission
              ? false
              : true
          }
          onPress={() => {
            RegisterHandle(
              data.namaDepan,
              data.namBelakang,
              data.email,
              data.katasandi,
              data.konfirmasiKatasandi,
            );
          }}>
          <View
            style={
              !data.namaDepanIsEmpty &&
              !data.namaBelakangIsEmpty &&
              !data.emailIsEmpty &&
              !data.kataSandiIsEmpty &&
              !data.konfirmasiKataSandiIsEmpty &&
              data.permission
                ? styles.buttonMasuk
                : styles.buttonMasukDisable
            }>
            <Text style={styles.buttonTextMasuk}>BUAT AKUN BARU</Text>
          </View>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default RegisterStep3;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
  text: {
    fontFamily: 'Karla-SemiBold',
    fontSize: 16,
    color: color.gray,
  },
  form: {
    marginVertical: 10,
  },
  TextInput: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  InputText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    width: 300,
    color: color.black,
  },
  InputWarning: {
    marginTop: 5,
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    color: color.warning,
  },
  ViewInput: (condition, condition2, active) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor:
      condition || condition2
        ? color.warning
        : active
        ? color.orange
        : color.gray,
    borderRadius: 4,
    paddingVertical: 2,
  }),
  coloumn: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  checkBox: check => ({
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: check ? color.orange : color.backgroundColor,
    borderWidth: check ? null : 1,
  }),
  permissioNormal: {
    marginLeft: 10,
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    color: color.gray,
    justifyContent: 'center',
  },
  permissioActive: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    color: color.orange,
    justifyContent: 'center',
  },
  buttonMasuk: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: color.orange,
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
    backgroundColor: color.gray,
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
    color: color.white,
  },
});
