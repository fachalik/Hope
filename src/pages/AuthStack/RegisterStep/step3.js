import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../../../components/Universal/BackButton';
import {AuthContext} from '../../../router/context';
import config from '../../../../config';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordStrengthIndicator from '../../../components/Universal/PasswordStrengthIndicator';

const RegisterStep3 = ({navigation}) => {
  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ConfirmPassword: '',
    check_TextEmail: false,
    check_TextFirstName: false,
    check_TextLastName: false,
    secureTextEntry: true,
    secureTextEntryConfirm: true,
    emailIsEmpty: false,
    passwordIsEmpty: false,
    firstNameIsEmpty: false,
    lastNameisEmpty: false,
    confirmPasswordIsEmpty: false,
    errorConfirmPassword: false,
    errorEmail: false,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });

  const {SignUp} = useContext(AuthContext);

  const firstNameChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        firstName: val,
        check_TextFirstName: true,
        firstNameIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        check_TextFirstName: false,
        firstNameIsEmpty: false,
      });
    }
  };
  const lasttNameChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        lastName: val,
        check_TextLastName: true,
        lastNameisEmpty: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        check_TextLastName: false,
        lastNameisEmpty: false,
      });
    }
  };

  const textInputChangeEmail = val => {
    if (val.length != 0) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (pattern.test(val)) {
        setData({
          ...data,
          email: val,
          check_TextEmail: true,
          emailIsEmpty: true,
        });
      }
    } else {
      setData({
        ...data,
        email: val,
        check_TextEmail: false,
        emailIsEmpty: false,
      });
    }
  };

  const handlePassword = val => {
    if (val.length > 7) {
      setData({
        ...data,
        password: val,
        passwordIsEmpty: true,
      });
      setPasswordValidity({
        minChar: val.length >= 8 ? true : false,
        number: isNumberRegx.test(val) ? true : false,
        specialChar: specialCharacterRegx.test(val) ? true : false,
      });
    } else {
      setData({
        ...data,
        password: val,
        passwordIsEmpty: false,
      });
      setPasswordValidity({
        minChar: val.length >= 8 ? true : false,
        number: isNumberRegx.test(val) ? true : false,
        specialChar: specialCharacterRegx.test(val) ? true : false,
      });
    }
  };

  const handleConfirmPassword = (val, password) => {
    if (val === password) {
      console.log('betul');
      setData({
        ...data,
        ConfirmPassword: val,
        confirmPasswordIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        ConfirmPassword: val,
        confirmPasswordIsEmpty: false,
      });
    }
  };

  const updateSecureTextEntry = val => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateSecureTextEntryConfirm = val => {
    setData({
      ...data,
      secureTextEntryConfirm: !data.secureTextEntryConfirm,
    });
  };

  const RegisterHandle = async (
    firstName,
    lastName,
    email,
    password,
    ConfirmPassword,
  ) => {
    console.log(firstName, lastName, email, password, ConfirmPassword);
    setIsLoading(true);
    //mergeItem to asyncstorage formstep1
    if (password != ConfirmPassword) {
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
        const jsonValue = await AsyncStorage.getItem('formStep1');
        const parseJsonValue = await JSON.parse(jsonValue);
        await axios
          .post(config.API_URL + 'auth/register/', {
            email: email,
            password: password,
            profile: {
              first_name: firstName,
              last_name: lastName,
              weight: 0,
              height: 0,
              job: '',
              activities: '',
              disease_history: '',
            },
          })
          .then(function (response) {
            console.log(response.data);
            confirmSuccess = response.data.success;
            console.log(confirmSuccess);
            AsyncStorage.setItem('RegistComplete', 'true');
            confirmSuccess == 'True'
              ? navigation.navigate('RegistComplete')
              : null;
          })
          .catch(function (error) {
            console.log(error.response.data.email);
            if (error.response.data.email != undefined) {
              setData({
                ...data,
                errorEmail: true,
              });
            } else {
              setData({
                ...data,
                errorEmail: false,
              });
            }
          });
        await SignUp(email, password, confirmSuccess);
      } catch (e) {
        //   error reading value
        console.log(e);
      }
      await setIsLoading(false);
      console.log(email, password, ConfirmPassword);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView>
        <View style={styles.wrapper}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Informasi Umum</Text>
          <View style={styles.form}>
            {/* // Input Form for FirstName */}
            <View style={styles.TextInput}>
              <Text st>Nama Depan</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="user" size={20} color={color.yellow} />
              <TextInput
                style={styles.InputText}
                placeholder="Mohon masukkan nama depan anda"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => firstNameChange(val)}
              />
              {data.check_TextFirstName ? (
                <Feather name="check-circle" size={20} color={color.yellow} />
              ) : null}
            </View>

            {/* // Input Form for FirstName */}
            <View style={styles.TextInput}>
              <Text st>Nama Belakang</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="user" size={20} color={color.yellow} />
              <TextInput
                style={styles.InputText}
                placeholder="Mohon masukkan nama belakang anda"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => lasttNameChange(val)}
              />
              {data.check_TextLastName ? (
                <Feather name="check-circle" size={20} color={color.yellow} />
              ) : null}
            </View>
            {/* // Input Form for Email */}
            <View style={styles.TextInput}>
              <Text style={{fontFamily: 'Karla-Medium'}}>Email</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="mail" size={20} color={color.yellow} />
              <TextInput
                style={styles.InputText}
                placeholder="Mohon masukkan email anda"
                keyboardType="email-address"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => textInputChangeEmail(val)}
              />

              {data.check_TextEmail ? (
                <Feather name="check-circle" size={20} color={color.yellow} />
              ) : null}
            </View>
            {data.errorEmail ? (
              <View style={styles.TextInput}>
                <Text style={styles.errosMessages}>Email telah digunakan</Text>
              </View>
            ) : null}

            {/* // Input Form for Password */}
            <View style={styles.TextInput}>
              <Text style={{fontFamily: 'Karla-Medium'}}>Kata sandi</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="lock" size={20} color={color.yellow} />
              <TextInput
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.InputText}
                placeholder="Mohon masukkan kata sandi anda"
                autoCapitalize="none"
                placeholderTextColor="grey"
                onChangeText={val => handlePassword(val)}
                onFocus={() => setPasswordFocused(true)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" size={20} color="grey" />
                ) : (
                  <Feather name="eye" size={20} color={color.yellow} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.TextInput}>
              {passwordFocused && (
                <PasswordStrengthIndicator validity={passwordValidity} />
              )}
            </View>

            {/* // Input Form for ConfirmPassword */}
            <View style={styles.TextInput}>
              <Text style={{fontFamily: 'Karla-Medium'}}>
                Konfirmasi kata sandi
              </Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="lock" size={20} color={color.yellow} />
              <TextInput
                secureTextEntry={data.secureTextEntryConfirm ? true : false}
                style={styles.InputText}
                autoCapitalize="none"
                placeholder="Mohon masukkan kata sandi anda"
                placeholderTextColor="grey"
                onChangeText={val => handleConfirmPassword(val, data.password)}
              />
              <TouchableOpacity onPress={updateSecureTextEntryConfirm}>
                {data.secureTextEntryConfirm ? (
                  <Feather name="eye-off" size={20} color="grey" />
                ) : (
                  <Feather name="eye" size={20} color={color.yellow} />
                )}
              </TouchableOpacity>
            </View>
            {data.errorConfirmPassword ? (
              <View style={styles.TextInput}>
                <Text style={styles.errorMessages}>
                  Password yang anda masukkan tidak sama
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              disabled={
                data.emailIsEmpty &&
                data.confirmPasswordIsEmpty &&
                passwordValidity.minChar &&
                passwordValidity.number &&
                passwordValidity.specialChar
                  ? false
                  : true
              }
              onPress={() => {
                RegisterHandle(
                  data.firstName,
                  data.lastName,
                  data.email,
                  data.password,
                  data.ConfirmPassword,
                );
              }}>
              <View
                style={
                  data.emailIsEmpty &&
                  data.confirmPasswordIsEmpty &&
                  passwordValidity.minChar &&
                  passwordValidity.number &&
                  passwordValidity.specialChar
                    ? styles.buttonMasuk
                    : styles.buttonMasukDisable
                }>
                {isLoading ? (
                  <ActivityIndicator color={'white'} size="large" />
                ) : (
                  <Text style={styles.buttonTextMasuk}>BUAT AKUN BARU</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* {isLoading ? <Loading loading={isLoading} /> : null} */}
    </KeyboardAvoidingView>
  );
};

export default RegisterStep3;
const windowWidth = Dimensions.get('screen').width;
const radius_size = 15;
const button_height = 50;
const width_button = windowWidth - 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  wrapper: {
    marginVertical: 50,
    marginHorizontal: 30,
  },
  button: {},
  illustrationHeader: {
    alignSelf: 'center',
    height: '40%',
    width: '100%',
  },
  title: {
    marginTop: 30,
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
  },
  text: {
    fontFamily: 'Roboto-Regular',

    marginTop: 5,
    opacity: 0.4,
  },
  form: {
    marginVertical: 10,
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 10,
    borderColor: color.yellow,
    borderRadius: 10,
    paddingVertical: 2,
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  InputText: {
    flex: 1,
    alignItems: 'center',
    width: 270,
    height: 40,
    paddingHorizontal: 10,
    color: color.black,
  },
  buttonMasuk: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: color.yellow,
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
    flex: 1,
    alignSelf: 'center',
    backgroundColor: color.gray,
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
    color: color.white,
  },
});
