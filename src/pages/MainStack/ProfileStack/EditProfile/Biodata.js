import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'react-native-axios';
import config from '../../../../../config';
import colors from '../../../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Biodata = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [goToAccount, setGoToAccount] = useState(false);
  const [tempData, setTempData] = useState({
    firstName: props.props.params.first_name,
    lastName: props.props.params.last_name,
    height: String(props.props.params.height),
    weight: String(props.props.params.weight),
    job: props.props.params.job,
    activity: props.props.params.activities,
    diseaseHistory: props.props.params.disease_history,
  });
  const [data, setData] = useState({
    firstName: props.props.params.first_name,
    lastName: props.props.params.last_name,
    height: String(props.props.params.height),
    weight: String(props.props.params.weight),
    job: props.props.params.job,
    activity: props.props.params.activities,
    diseaseHistory: props.props.params.disease_history,
    firstNameSame: true,
    lastNameSame: true,
    heightSame: true,
    weightSame: true,
    jobSame: true,
    activitySame: true,
    diseaseHistorySame: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const handleFirstName = val => {
    val === tempData.firstName
      ? setData({
          ...data,
          firstName: val,
          firstNameSame: true,
        })
      : setData({
          ...data,
          firstName: val,
          firstNameSame: false,
        });
  };
  const handleLastName = val => {
    val === tempData.lastName
      ? setData({
          ...data,
          lastName: val,
          lastNameSame: true,
        })
      : setData({
          ...data,
          lastName: val,
          lastNameSame: false,
        });
  };
  const handleHeight = val => {
    val === tempData.height
      ? setData({
          ...data,
          height: val,
          heightSame: true,
        })
      : setData({
          ...data,
          height: val,
          heightSame: false,
        });
  };
  const handleWeight = val => {
    val === tempData.weight
      ? setData({
          ...data,
          weight: val,
          weightSame: true,
        })
      : setData({
          ...data,
          weight: val,
          weightSame: false,
        });
  };
  const handleJob = val => {
    val === tempData.job
      ? setData({
          ...data,
          job: val,
          jobSame: true,
        })
      : setData({
          ...data,
          job: val,
          jobSame: false,
        });
  };
  const handleActivity = val => {
    val === tempData.activity
      ? setData({
          ...data,
          activity: val,
          activitySame: true,
        })
      : setData({
          ...data,
          activity: val,
          activitySame: false,
        });
  };
  const handleDiseaseHistory = val => {
    val === tempData.diseaseHistory
      ? setData({
          ...data,
          diseaseHistory: val,
          diseaseHistorySame: true,
        })
      : setData({
          ...data,
          diseaseHistory: val,
          diseaseHistorySame: false,
        });
  };
  const handleModal = async () => {
    // props.handleIsLoading(false)
    await setModalVisible(false);
    await setGoToAccount(true);
    await props.handleIsLoading(false);
    await navigation.navigate('Account');
  };
  const UpdateHistoryHandle = async (
    firstName,
    lastName,
    height,
    weight,
    job,
    activity,
    diseaseHistory,
  ) => {
    console.log(
      firstName,
      lastName,
      height,
      weight,
      job,
      activity,
      diseaseHistory,
    );
    await props.handleIsLoading(true);
    //mergeItem to asyncstorage formstep1
    try {
      let confirmSuccess;
      confirmSuccess = null;
      var userToken = await AsyncStorage.getItem('userToken');
      const RefreshToken = await AsyncStorage.getItem('RefreshToken');
      console.log(RefreshToken + ' refresh');
      await axios
        .post(config.API_URL + 'auth/login/refresh/', {
          refresh: RefreshToken,
        })
        .then(async function (response) {
          // console.log(response.data);
          console.log(response.data);
          await AsyncStorage.setItem('userToken', response.data.access);
          userToken = await response.data.access;
        })
        .catch(function (error) {
          console.log(error);
        });
      await console.log(userToken);
      await axios
        .put(
          config.API_URL + 'profile/me/',
          {
            first_name: firstName,
            last_name: lastName,
            weight: parseInt(weight),
            height: parseInt(height),
            job: job,
            activities: activity,
            disease_history: diseaseHistory,
          },
          {headers: {Authorization: 'Bearer ' + userToken}},
        )
        .then(function (response) {
          console.log(response.data);
          confirmSuccess = response.status;
          console.log(confirmSuccess);
        })
        .catch(function (error) {
          console.log(error);
        });
      await axios
        .get(config.API_URL + 'profile/me/', {
          headers: {Authorization: 'Bearer ' + userToken},
        })
        .then(async function (response) {
          const getData = response.data;
          await AsyncStorage.setItem(
            'UserProfile',
            JSON.stringify(response.data),
          );
          console.log(getData);
          await setData({
            firstName: getData.first_name,
            lastName: getData.last_name,
            height: String(getData.height),
            weight: String(getData.weight),
            job: getData.job,
            activity: getData.activities,
            diseaseHistory: getData.disease_history,
          });
          await setTempData({
            firstName: getData.first_name,
            lastName: getData.last_name,
            height: String(getData.height),
            weight: String(getData.weight),
            job: getData.job,
            activity: getData.activities,
            diseaseHistory: getData.disease_history,
          });
          console.log('userProfile berhasil disimpan');
          await setModalVisible(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      //   error reading value
      console.log(e);
    }
    await props.handleIsLoading(false);
  };
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.form}>
          {/* // Input Form for Firstname */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Nama depan</Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              style={styles.InputText}
              value={data.firstName}
              placeholderTextColor="black"
              onChangeText={val => handleFirstName(val)}
            />
          </View>

          {/* // Input Form for LastName */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Nama belakang</Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.InputText}
              value={data.lastName}
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={val => handleLastName(val)}
            />
          </View>

          {/* // Input Form for height & weight */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>
              Tinggi & berat badan
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.ViewInputRow}>
              <TextInput
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.InputText}
                value={data.height}
                autoCompleteType="cc-number"
                placeholderTextColor="grey"
                keyboardType="decimal-pad"
                autoCapitalize="none"
                onChangeText={val => handleHeight(val)}
              />
              <Text style={{fontSize: 12}}>Cm</Text>
            </View>
            <View style={styles.ViewInputRow}>
              <TextInput
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.InputText}
                value={data.weight}
                autoCompleteType="cc-number"
                keyboardType="decimal-pad"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={val => handleWeight(val)}
              />
              <Text style={{fontSize: 12}}>Kg</Text>
            </View>
          </View>

          {/* // Input Form for Job */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Pekerjaan</Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.InputText}
              value={data.job}
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={val => handleJob(val)}
            />
          </View>

          {/* // Input Form for Activities */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>
              Aktivitas sehari-hari
            </Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.InputText}
              value={data.activity}
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={val => handleActivity(val)}
            />
          </View>

          {/* // Input Form for disease_history */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Riwayat penyakit</Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.InputText}
              value={data.diseaseHistory}
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={val => handleDiseaseHistory(val)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            UpdateHistoryHandle(
              data.firstName,
              data.lastName,
              data.height,
              data.weight,
              data.job,
              data.activity,
              data.diseaseHistory,
            );
          }}>
          <View
            style={
              !data.firstNameSame ||
              !data.lastNameSame ||
              !data.heightSame ||
              !data.weightSame ||
              !data.jobSame ||
              !data.activitySame ||
              !data.diseaseHistorySame
                ? styles.buttonMasuk
                : styles.buttonMasukDisable
            }>
            <Text style={styles.buttonTextMasuk}>SIMPAN</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.headerModal}>
                <Text>Sukses</Text>
              </View>
              <View style={styles.bodyModal}>
                <Text style={styles.modalText}>Pembaruan Profil Berhasil</Text>
              </View>

              <View style={styles.footerModal}>
                <Pressable
                  style={styles.buttonModal}
                  onPress={() => handleModal()}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Biodata;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
    marginVertical: 20,
    alignItems: 'center',
  },
  wrapper: {
    marginHorizontal: 30,
  },
  ViewInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.yellow,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 2,
  },
  ViewInputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.yellow,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 2,
    marginHorizontal: 5,
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
  buttonMasuk: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('6%'),
    borderRadius: 15,
    marginVertical: 20,
  },
  buttonMasukDisable: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.gray,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('6%'),
    borderRadius: 15,
    marginVertical: 20,
  },
  buttonTextMasuk: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: 'column',
    margin: 20,
    backgroundColor: colors.white,
    width: wp('80%'),
    height: hp('30%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    backgroundColor: colors.yellow,
    width: '100%',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  footerModal: {
    borderTopWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    width: '100%',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: colors.yellow,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
