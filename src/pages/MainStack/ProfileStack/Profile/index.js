import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Title} from 'react-native-paper';
import {Avatar} from '../../../../assets';
import {AuthContext} from '../../../../router/context';
import colors from '../../../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {LogoTemp} from '../../../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoadingV2 from '../../../../components/Universal/LoadingV2';

const Profile = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const {SignOut} = useContext(AuthContext);

  console.log('isLoading' + isLoading);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        console.log('running');
        const jsonValue = await AsyncStorage.getItem('UserProfile');
        await setData(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue));
        await setIsLoading(false);
      } catch (e) {
        //   error reading value
        console.log(e);
      }
    });
  }, [navigation]);

  const logOutHandle = async () => {
    await setIsLoading(true);
    await console.log('isloading true');
    await setTimeout(() => {
      SignOut();
    }, 2000);
    await console.log('isloading false');
    await setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{marginVertical: 20, alignItems: 'center'}}>
          <LogoTemp />
        </View>
        <View
          style={{
            borderBottomColor: '#dddddd',
            borderBottomWidth: 1,
          }}></View>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={Avatar} size={80} />
              <View style={{marginLeft: 20, flexDirection: 'column'}}>
                <Text style={{color: colors.gray_dark}}>Selamat Datang</Text>
                <Title style={[styles.title]}>
                  {data.first_name === undefined && data.last_name === undefined
                    ? null
                    : data.first_name + ' ' + data.last_name}
                </Title>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#dddddd',
            borderBottomWidth: 1,
          }}></View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Edit Profile', data);
            }}>
            <View style={{marginTop: 10}}>
              <View style={styles.menu}>
                <Ionicons name="settings" style={styles.icon} size={24} />
                <Text
                  style={{
                    flex: 0.8,
                    alignItems: 'center',
                    width: 270,
                    color: colors.black,
                    fontFamily: 'Karla-Bold',
                    fontSize: 16,
                  }}>
                  Edit Profile
                </Text>
                <FeatherIcon
                  name="chevron-right"
                  style={styles.icon}
                  size={22}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonKeluar}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              logOutHandle();
            }}>
            <Text style={{fontWeight: 'bold', color: colors.yellow}}>
              KELUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? <LoadingV2 loading={isLoading} /> : null}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  userInfoSection: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Karla-Bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  menu: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 11,
    marginVertical: 8,
    color: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxIcon: {
    height: 45,
    width: 45,
    backgroundColor: colors.gray,
    borderRadius: 12,
    marginRight: 30,
  },
  buttonKeluar: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.yellow,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('6%'),
    borderRadius: 15,
    marginVertical: 20,
  },
});
{
  /* <TouchableOpacity
        onPress={() => {
          SignOut();
        }}>
        <Text style={{fontSize: 20, fontFamily: 'bold'}}>Logout</Text>
      </TouchableOpacity> */
}
