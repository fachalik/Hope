import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import colors from '../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CarouselItem = ({item}) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} resizeMode="cover" style={styles.image} />
      <View style={styles.textView}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'white',
    marginVertical: 10,
  },
  image: {
    height: hp('30%'),
    width: wp('80%'),
    borderRadius: 10,
    marginVertical: hp('3%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  title: {
    fontSize: 26,
    fontFamily: 'Karla-Bold',
    color: colors.black,
    textAlign: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Karla-Regular',
    color: colors.black,
    textAlign: 'justify',
    marginHorizontal: 30,
  },
});

export default CarouselItem;
