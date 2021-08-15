import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RumahSakit from '../pages/MainStack/HomeStack/LayananKesehatan/RumahSakit';
import Ambulance from '../pages/MainStack/HomeStack/LayananKesehatan/Ambulance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import colors from '../assets/colors';

const Tab = createMaterialTopTabNavigator();
const Mytabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="RumahSakit"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        tabBarIndicatorStyle: {backgroundColor: colors.orange},
      }}>
      <Tab.Screen
        name="RumahSakit"
        component={RumahSakit}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Ambulance"
        component={Ambulance}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const TopNavigator = () => {
  return <Mytabs />;
};

export default TopNavigator;
