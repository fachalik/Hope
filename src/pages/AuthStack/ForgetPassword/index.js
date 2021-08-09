import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../../../components/Universal/BackButton';

const ForgetPassword = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    check_TextEmail: false,
  });
  const textInputChangeEmail = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_TextEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_TextEmail: false,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <BackButton navigation={navigation} />
        <View style={styles.Row}>
          <Text style={styles.title}>Lupa kata sandi?</Text>
          <Text style={styles.text}>
            Masukkan alamat emailmu untuk menerima tautan pengaturan ulang sandi
          </Text>
          {/* // Input Form for Email */}
          <View style={styles.ViewInput}>
            <Icon name="mail" size={20} color={color.yellow} />
            <TextInput
              style={styles.InputText}
              placeholder="Email kamu"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={val => textInputChangeEmail(val)}
            />

            {data.check_TextEmail ? (
              <Feather name="check-circle" size={20} color={color.yellow} />
            ) : null}
          </View>
          <TouchableOpacity onPress={() => alert('Kirim Email')}>
            {/* <LinearGradient
              colors={['#F2C94C', '#F4A186']}
              style={styles.buttonMasuk}>
              <Text style={styles.buttonTextMasuk}>Kirim Email</Text>
            </LinearGradient> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;
const windowWidth = Dimensions.get('screen').width;
const radius_size = 15;
const button_height = 50;
const width_button = windowWidth - 60;
const makeitcenter = windowWidth * 0.5;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: color.white,
  },
  wrapper: {
    marginVertical: 50,
    marginHorizontal: 30,
  },
  Row: {
    marginVertical: makeitcenter,
    alignItems: 'center',
    justifyContent: 'center',
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
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 2,
    marginTop: 10,
    borderColor: color.yellow,
    borderRadius: 23,
    paddingVertical: 2,
  },
  InputText: {
    width: 300,
    paddingHorizontal: 10,
    color: color.black,
  },
  buttonMasuk: {
    alignSelf: 'center',
    color: color.white,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: width_button,
    height: button_height,
    borderTopLeftRadius: radius_size,
    borderTopRightRadius: radius_size,
    borderBottomLeftRadius: radius_size,
    borderBottomRightRadius: radius_size,
    marginVertical: 10,
  },
  buttonTextMasuk: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: color.white,
  },
});
