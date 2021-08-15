import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainLayout from '../../../../components/MainLayout';
import TopNavigator from '../../../../router/TopNavigator';
import Content from './Content';

const LayananKesehatan = () => {
  return (
    <>
      <Content />
      <TopNavigator />
    </>
  );
};

export default LayananKesehatan;

const styles = StyleSheet.create({});
