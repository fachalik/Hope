import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import colors from '../../../assets/colors';

const LoadingV2 = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator color={'white'} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default LoadingV2;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 8,
  },
  text: {
    marginLeft: 16,
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
});
