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
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterStep2 = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    Height: '',
    Weight: '',
    DiseaseHistory: '',
    check_TextHeight: false,
    check_TextWeight: false,
    check_TextDiseaseHistory: false,
    HeightIsEmpty: false,
    WeightIsEmpty: false,
    DiseaseHistoryIsEmpty: false,
  });

  const {SignUp} = useContext(AuthContext);

  const HeightChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        Height: val,
        check_TextHeight: true,
        HeightIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        Height: val,
        check_TextHeight: false,
        HeightIsEmpty: false,
      });
    }
  };

  const WeightChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        Weight: val,
        check_TextWeight: true,
        WeightIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        Weight: val,
        check_TextWeight: false,
        WeightIsEmpty: false,
      });
    }
  };

  const DiseaseHistoryChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        DiseaseHistory: val,
        check_TextDiseaseHistory: true,
        DiseaseHistoryIsEmpty: true,
      });
    } else {
      setData({
        ...data,
        DiseaseHistory: val,
        check_TextDiseaseHistory: false,
        DiseaseHistoryIsEmpty: false,
      });
    }
  };

  const RegisterHandle = async (Height, Weight, DiseaseHistory) => {
    setIsLoading(true);
    await setIsLoading(true);
    setTimeout(async () => {
      try {
        await AsyncStorage.mergeItem(
          'formStep1',
          JSON.stringify({
            height: Height,
            weight: Weight,
            disease_history: DiseaseHistory,
          }),
        );
        const jsonValue = await AsyncStorage.getItem('formStep1');
        await console.log(JSON.parse(jsonValue));
      } catch (e) {
        console.log(e);
      }
      await setIsLoading(false);
      navigation.navigate('RegisterStep3');
    }, 1000);
    // GETDATA ASYNCRONUSSTORAGEF
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView>
        <View style={styles.wrapper}>
          <BackButton navigation={navigation} />
          <Text style={styles.title}>Informasi Pribadi</Text>
          <View style={styles.form}>
            {/* // Input Form for FirstName */}
            <View style={styles.TextInput}>
              <Text st>Tinggi Badan</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="user" size={20} color={color.yellow} />
              <TextInput
                style={styles.InputText}
                placeholder="Mohon masukkan tinggi badan anda"
                keyboardType="decimal-pad"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => HeightChange(val)}
              />

              {data.check_TextHeight ? (
                <Feather name="check-circle" size={20} color={color.yellow} />
              ) : null}
            </View>

            {/* // Input Form for LastName */}
            <View style={styles.TextInput}>
              <Text st>Berat Badan</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="user" size={20} color={color.yellow} />
              <TextInput
                style={styles.InputText}
                placeholder="Mohon masukkan berat badan anda"
                keyboardType="decimal-pad"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => WeightChange(val)}
              />

              {data.check_TextWeight ? (
                <Feather name="check-circle" size={20} color={color.yellow} />
              ) : null}
            </View>

            {/* // Input Form for Job */}
            <View style={styles.TextInput}>
              <Text st>Riwayat Penyakit</Text>
            </View>
            <View style={styles.ViewInput}>
              <Icon name="user" size={20} color={color.yellow} />
              <TextInput
                style={styles.InputText}
                placeholder="Mohon masukkan riwayat penyakit anda"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => DiseaseHistoryChange(val)}
              />

              {data.check_TextDiseaseHistory ? (
                <Feather name="check-circle" size={20} color={color.yellow} />
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            disabled={
              data.HeightIsEmpty &&
              data.WeightIsEmpty &&
              data.DiseaseHistoryIsEmpty
                ? false
                : true
            }
            onPress={() => {
              RegisterHandle(data.Height, data.Weight, data.DiseaseHistory);
            }}>
            <View
              style={
                data.HeightIsEmpty &&
                data.WeightIsEmpty &&
                data.DiseaseHistoryIsEmpty
                  ? styles.buttonMasuk
                  : styles.buttonMasukDisable
              }>
              {isLoading ? (
                <ActivityIndicator color={'white'} size="large" />
              ) : (
                <Text style={styles.buttonTextMasuk}>SELANJUTNYA</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* {isLoading ? <Loading loading={isLoading} /> : null} */}
    </KeyboardAvoidingView>
  );
};

export default RegisterStep2;
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
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.4,
    marginHorizontal: 30,
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
    width: 270,
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
