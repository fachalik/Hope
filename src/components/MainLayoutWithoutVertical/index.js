import React from 'react';
import {StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import color from '../../assets/colors';
import LoadingV2 from '../Universal/LoadingV2';

const MainLayoutWithoutVertical = ({children, boolean}) => {
  console.log(boolean);
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView style={styles.wrapper}>{children}</ScrollView>
      {boolean ? <LoadingV2 /> : null}
    </KeyboardAvoidingView>
  );
};

export default MainLayoutWithoutVertical;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
});
