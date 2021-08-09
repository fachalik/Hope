import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../../../../assets/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ConsultationImage} from '../../../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ChatBot = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.Title}>Konsultasi</Text>
          <Image
            source={ConsultationImage}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.Text}>
            Konsultasi dengan beberapa pilihan dibawah
          </Text>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Konsultasi');
              }}>
              <View style={styles.Box}>
                <Text style={styles.BoxText}>Chat Hope</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Konsultasi Dokter');
              }}>
              <View style={styles.Box}>
                <Text style={styles.BoxText}>Chat Dokter</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Konsultasi Psikolog');
              }}>
              <View style={styles.Box}>
                <Text style={styles.BoxText}>Chat Psikolog</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  header: {
    height: hp('100%'),
    flex: 0.5,
    marginTop: 50,
  },
  footer: {
    flex: 0.5,
  },
  Title: {
    fontFamily: 'Karla-Bold',
    fontSize: 24,
  },
  Text: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
  },
  Box: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 5,
    borderColor: colors.yellow,
  },
  BoxText: {
    marginVertical: 20,
    fontFamily: 'Karla-Bold',
    color: colors.gray_dark,
  },
  image: {
    width: wp('80%'),
    height: hp('30%'),
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ChatBot;
