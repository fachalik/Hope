import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import colors from '../../../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import BackButton from '../../../components/Universal/BackButton';
import {AuthContext} from '../../../router/context';
import Loading from '../../../components/Universal/LoadingV2';
const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    emailIsEmpty: false,
    check_TextEmail: false,
    emailActive: false,

    katasandi: '',
    kataSandiIsEmpty: false,
    secureTextEntry: true,
    kataSandiActive: false,
  });
  const {SignIn} = React.useContext(AuthContext);
  const textInputChangeEmail = val => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (val.length != 0) {
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
    } else {
      setData({
        ...data,
        katasandi: val,
        kataSandiIsEmpty: true,
      });
    }
  };

  const updateSecureTextEntry = val => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = async (email, password) => {
    await setIsLoading(true);
    console.log(email, password);
    await SignIn(email, password);
    await setIsLoading(false);
  };

  return (
    <MainLayout boolean={isLoading}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.text}>
        Masukkan e-mail dan password akun dokter anda
      </Text>
      <View style={styles.separator}>
        <View style={styles.form}>
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
                <Feather name="eye" size={20} color={colors.orange} />
              )}
            </TouchableOpacity>
          </View>
          {data.kataSandiIsEmpty ? (
            <Text style={styles.InputWarning}>Kata sandi harus diisi</Text>
          ) : null}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={
              !data.emailIsEmpty && !data.kataSandiIsEmpty ? false : true
            }
            onPress={() => {
              loginHandle(data.email, data.katasandi);
            }}>
            <View
              style={
                !data.emailIsEmpty && !data.kataSandiIsEmpty
                  ? styles.buttonMasuk
                  : styles.buttonMasukDisable
              }>
              <Text style={styles.buttonTextMasuk}>MASUK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* {isLoading ? <Loading loading={isLoading} /> : null} */}
    </MainLayout>
  );
};

export default Login;

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
    borderWidth: 1,
    marginTop: 10,
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
