import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import colors from '../../../assets/colors';

const Developed = ({navigation}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator color={colors.orange} />
        <Text style={styles.text}>InDevelop</Text>
      </View>
    </View>
  );
};

export default Developed;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    marginLeft: 16,
    color: colors.black,
    fontSize: 12,
    fontWeight: '500',
  },
});
