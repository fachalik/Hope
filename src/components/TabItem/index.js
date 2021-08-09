import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import color from '../../assets/colors';
import {
  IconHomeActive,
  IconHome,
  IconProfile,
  IconProfileActive,
} from '../../assets';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') return isFocused ? <IconHomeActive /> : <IconHome />;
    if (label === 'Account')
      return isFocused ? <IconProfileActive /> : <IconProfile />;

    return <IconHome />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.Text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  Text: isFocused => ({
    fontFamily: isFocused ? 'Poppins-SemiBold' : 'Poppins-Regular',
    fontSize: 12,
    color: isFocused ? color.orange : color.gray,
  }),
});
