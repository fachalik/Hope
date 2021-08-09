import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import color from '../../assets/colors';

const MainLayout = ({children}) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView style={styles.wrapper}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    paddingHorizontal: 20,
    marginVertical: Platform.OS === 'ios' ? 60 : 30,
  },
});
