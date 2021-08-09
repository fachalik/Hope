import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import dummyData from './dummyData';
import colors from '../../../../assets/colors';
const Kategori = ({route, navigation}) => {
  const request = route.params;
  const DisplayCategory = () => {
    return dummyData.map(item => {
      return (
        <TouchableOpacity
          key={item.sfMedicinefor}
          onPress={() => {
            navigation.navigate('Detail Obat', {
              request: item.sfMedicinefor,
            });
          }}>
          <View
            style={{
              width: 105,
              height: 105,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.soft_gray,
              borderRadius: 10,
              marginVertical: 5,
            }}>
            <Image
              source={item.image}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
            <Text style={{fontFamily: 'Karla-Bold', fontSize: 12}}>
              {item.medicinefor}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={{fontFamily: 'Karla-Bold'}}>Cari Keluhanmu!</Text>
        <View style={styles.itemlayanan}>
          <DisplayCategory />
        </View>
      </View>
    </ScrollView>
  );
};

export default Kategori;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
  itemlayanan: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  itemObat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  header: {
    backgroundColor: colors.gray,
    shadowRadius: 2,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
  },
  contents: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bigTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.gray,
    paddingTop: 20,
  },
});
