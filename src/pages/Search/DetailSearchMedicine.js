import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import colors from '../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackButton from '../../components/Universal/BackButton';
import {useNavigation} from '@react-navigation/native';
const DetailSearchMedicine = props => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <BackButton navigation={navigation} />

        <View style={{flexDirection: 'column'}}>
          <Image
            source={{uri: props.route.params.request.image}}
            style={{
              width: wp('100%'),
              height: hp('40%'),
              marginRight: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            resizeMode="stretch"
          />

          <Text style={{fontSize: 22, fontFamily: 'Karla-Regular'}}>
            {props.route.params.request.name}
          </Text>

          <Text style={{fontSize: 16, fontFamily: 'Karla-Bold'}}>
            {props.route.params.request.price_range}
          </Text>
          <View style={{marginVertical: 10}}>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Deskripsi</Text>
              <Text style={styles.content}>
                {props.route.params.request.description}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Manfaat</Text>
              <Text style={styles.content}>
                {props.route.params.request.benefits}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Komposisi</Text>
              <Text style={styles.content}>
                {props.route.params.request.composition}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Dosis</Text>
              <Text style={styles.content}>
                {props.route.params.request.dosage}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Penyajian</Text>
              <Text style={styles.content}>
                {props.route.params.request.serving}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Efek Samping</Text>
              <Text style={styles.content}>
                {props.route.params.request.side_effect}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Produsen</Text>
              <Text style={styles.content}>
                {props.route.params.request.producer}
              </Text>
            </View>
            <View style={{marginVertical: 15}}>
              <Text style={styles.title}>Perhatian</Text>
              <Text style={styles.content}>
                {props.route.params.request.consideration}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailSearchMedicine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Karla-Medium',
  },
  content: {
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Karla-Regular',
  },
});
