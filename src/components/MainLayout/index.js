import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
} from 'react-native';
import colors from '../../assets/colors';
import LoadingV2 from '../Universal/LoadingV2';

const MainLayout = ({children, boolean}) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView style={styles.wrapper}>{children}</ScrollView>
      {boolean ? <LoadingV2 /> : null}
    </KeyboardAvoidingView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.backgroundColor,
  },
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
});
