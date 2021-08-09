import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../assets/colors';
import {RegistCompleteImage} from '../../../assets';
const {width, height} = Dimensions.get('window');
const RegistComplete = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={RegistCompleteImage} style={styles.image} />
      <Text style={styles.text}>Selamat kamu telah berhasil membuat akun</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <View style={styles.buttonMasuk}>
          <Text style={styles.buttonTextMasuk}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RegistComplete;
const windowWidth = Dimensions.get('screen').width;
const radius_size = 15;
const button_height = 50;
const width_button = windowWidth - 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    width: width,
    height: height / 2.5,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Karla-Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  buttonMasuk: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: colors.yellow,
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
    color: colors.white,
  },
});
