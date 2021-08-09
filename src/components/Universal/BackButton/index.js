import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import color from '../../../assets/colors';

const BackButton = ({navigation}) => {
  const GoBack = async () => {
    const value = await AsyncStorage.getItem('RegistComplete');
    value === 'true'
      ? navigation.navigate('LoginRegistOnBoard')
      : navigation.pop();
    await AsyncStorage.removeItem('RegistComplete');
  };
  return (
    <TouchableOpacity onPress={() => GoBack()}>
      <Icon
        style={styles.IconStyle}
        name="arrowleft"
        size={24}
        color={color.orange}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  IconStyle: {
    marginTop: 20,
    zIndex: 2,
  },
});
