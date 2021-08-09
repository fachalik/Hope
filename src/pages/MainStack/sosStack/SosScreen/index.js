import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Linking} from 'react-native';
import colors from '../../../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {Teman, SOS, OrangTua, Ambulance} from '../../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SosScreen = ({navigation}) => {
  const [noTeman, setNoTeman] = useState('');
  const [noOrtu, setNoOrtu] = useState('');
  useEffect(() => {
    navigation.addListener('focus', async () => {
      try {
        const nomerTeman = await AsyncStorage.getItem('NoTeman');
        await setNoTeman(nomerTeman);
        const nomerOrangTua = await AsyncStorage.getItem('NoOrtu');
        await setNoOrtu(nomerOrangTua);
      } catch (e) {
        //   error reading value
        console.log(e);
      }
    });
  }, [navigation]);
  console.log(noTeman, noOrtu);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon
              name="close"
              style={{
                alignSelf: 'flex-end',
                color: colors.gray_dark,
                padding: 10,
              }}
              size={32}
            />
          </TouchableOpacity>
          <View style={styles.ItemLayananUtama}>
            {noTeman == null ? (
              <View style={styles.itemSos}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('InputNoTelp');
                  }}>
                  <Image style={styles.iconEmergency} source={Teman} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.itemSos}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${noTeman}`)}>
                  <Image style={styles.iconEmergency} source={Teman} />
                </TouchableOpacity>
              </View>
            )}
            {noOrtu == null ? (
              <View style={styles.itemSos}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('InputNoTelp');
                  }}>
                  <Image style={styles.iconEmergency} source={OrangTua} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.itemSos}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${noOrtu}`)}>
                  <Image style={styles.iconEmergency} source={OrangTua} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.itemSos}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${'212'}`);
                }}>
                <Image style={styles.iconEmergency} source={Ambulance} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemSos}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${'020'}`);
                }}>
                <Image style={styles.iconEmergency} source={SOS} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  box: {
    backgroundColor: colors.white,
    width: wp('80%'),
    height: hp('40%'),
    borderRadius: 20,
  },
  iconEmergency: {
    width: 100,
    height: 100,
  },
  ItemLayananUtama: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  itemSos: {
    width: wp('40%'),
    height: hp('15%'),
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
