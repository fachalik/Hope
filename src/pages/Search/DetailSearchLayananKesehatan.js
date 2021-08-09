import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import colors from '../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackButton from '../../components/Universal/BackButton';
import {useNavigation} from '@react-navigation/native';
const DetailSearchLayananKesehatan = props => {
  const navigation = useNavigation();
  console.log(props.route.params.request);
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
              <Text style={styles.title}>Nomer Telepon</Text>
              <Text style={styles.content}>
                {props.route.params.request.phone_number}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Alamat</Text>
              <Text style={styles.content}>
                {props.route.params.request.address}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Tentang</Text>
              <Text style={styles.content}>
                {props.route.params.request.about}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Text style={styles.title}>Layanan</Text>
              {props.route.params.request.services === undefined ? null : (
                <FlatList
                  data={props.route.params.request.services}
                  renderItem={({item}) => (
                    <View style={styles.column}>
                      <View key={item} style={styles.row}>
                        <View style={styles.bullet}>
                          <Text>{'\u2022' + ' '}</Text>
                        </View>
                        <View style={styles.bulletText}>
                          <Text>
                            <Text style={styles.contents}>{item}</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              )}
              {props.route.params.request.polyclinics === undefined ? null : (
                <FlatList
                  data={props.route.params.request.polyclinics}
                  renderItem={({item}) => (
                    <View style={styles.column}>
                      <View key={item} style={styles.row}>
                        <View style={styles.bullet}>
                          <Text>{'\u2022' + ' '}</Text>
                        </View>
                        <View style={styles.bulletText}>
                          <Text>
                            <Text style={styles.contents}>{item}</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailSearchLayananKesehatan;

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
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
});
