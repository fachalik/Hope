import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import dummyData from './dummyData';
import colors from '../../../../assets/colors';
import MainLayout from '../../../../components/MainLayout';
import Icon from 'react-native-vector-icons/AntDesign';

const Kategori = ({route, navigation}) => {
  const request = route.params;
  function doSomething(route) {
    return navigation.navigate('Detail Obat', {
      request: route,
    });
  }
  const DisplayCategory = () => {
    return dummyData.map(item => {
      return (
        <TouchableOpacity
          key={item.sfMedicinefor}
          onPress={() => {
            doSomething(item.sfMedicinefor);
          }}>
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 9999,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.backgroundColor,
              marginVertical: 20,
              marginHorizontal: 10,
              shadowColor: '#E3CFBD',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}>
            <Image
              source={item.image}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
              resizeMethod="resize"
            />
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              width: 100,
              textAlign: 'center',
            }}>
            {item.medicinefor}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <MainLayout>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchMedicine');
        }}>
        <View style={styles.searchBar}>
          <View style={{marginRight: 10}}>
            <Icon name="search1" size={20} color={colors.gray} />
          </View>
          <View>
            <Text>Cari Obatmu!</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={{fontFamily: 'Poppins-Regular', marginBottom: 5}}>
        Cari Keluhanmu!
      </Text>
      <View style={styles.itemlayanan}>
        <DisplayCategory />
      </View>
    </MainLayout>
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
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
  },
});
