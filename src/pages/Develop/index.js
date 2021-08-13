import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../assets/colors';
const Develop = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Karla-Bold', fontSize: 22}}>
        Dalam Masa Pengembangan :)
      </Text>
    </View>
  );
};

export default Develop;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
