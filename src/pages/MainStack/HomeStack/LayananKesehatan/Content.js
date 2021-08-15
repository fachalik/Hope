import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../../assets/colors';
import {useNavigation} from '@react-navigation/native';

const Content = () => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: colors.backgroundColor}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchLayananKesehatan');
        }}>
        <View style={styles.searchBar}>
          <View style={{marginRight: 10}}>
            <Icon name="search1" size={20} color={colors.yellow} />
          </View>
          <View>
            <Text>Cari Layanan Kesehatan</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 4,
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
