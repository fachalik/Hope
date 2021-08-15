import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {BottomNavigator} from '../components';
import {
  Home,
  Profil,
  ChatBotScreen,
  ChatDoctorScreen,
  ChatPsikologScreen,
  InfoObat,
  DetailObat,
  Develop,
  EditProfile,
  LayananKesehatan,
  SearchMedicine,
  KategoriObat,
  DetailSearchMedicine,
  SearchLayananKesehatan,
  DetailSearchLayananKesehatan,
  SosScreen,
  InputNoTelp,
  ContactList,
} from '../pages';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const SOSStack = createStackNavigator();
const AccountStack = createStackNavigator();

const HomeStackScreen = (props, {navigation}) => {
  console.log(props.route.params);
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        initialParams={props.route.params}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Info Obat"
        component={InfoObat}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <HomeStack.Screen
        name="Detail Obat"
        component={DetailObat}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <HomeStack.Screen
        name="Develop"
        component={Develop}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <HomeStack.Screen
        name="Layanan Kesehatan"
        component={LayananKesehatan}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <HomeStack.Screen
        name="SearchMedicine"
        component={SearchMedicine}
        options={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: {backgroundColor: 'white'},
          cardOverlayEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
      <HomeStack.Screen
        name="DetailSearchMedicine"
        component={DetailSearchMedicine}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="SearchLayananKesehatan"
        component={SearchLayananKesehatan}
        options={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: {backgroundColor: 'white'},
          cardOverlayEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
      <HomeStack.Screen
        name="DetailSearchLayananKesehatan"
        component={DetailSearchLayananKesehatan}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ChatBotScreen"
        component={ChatBotScreen}
        options={({route}) => ({
          title: 'Chat Hope',
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
      <HomeStack.Screen
        name="ChatDoctorScreen"
        component={ChatDoctorScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ChatPsikologScreen"
        component={ChatPsikologScreen}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen
        name="SosScreen"
        component={SosScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: {backgroundColor: 'rgba(0,0,0,0.15)'},
          cardOverlayEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
      <HomeStack.Screen
        name="InputNoTelp"
        component={InputNoTelp}
        options={{headerShown: false}}
      /> */}
    </HomeStack.Navigator>
  );
};

const SOSStackScreen = (props, {navigation}) => {
  const route = useRoute();
  return (
    <SOSStack.Navigator initialRouteName="SosScreen">
      <SOSStack.Screen
        name="SOS"
        component={SosScreen}
        options={{headerShown: false}}
      />
      <SOSStack.Screen
        name="InputNoTelp"
        component={InputNoTelp}
        options={({route}) => ({
          title: 'Input Nomor Penting',
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
      <SOSStack.Screen
        name="ContactList"
        component={ContactList}
        options={({route}) => ({
          title: 'Kontak',
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
    </SOSStack.Navigator>
  );
};

const AccountStackScreen = (props, {navigation}) => {
  return (
    <AccountStack.Navigator initialRouteName="Profil">
      <AccountStack.Screen
        name="Profil"
        component={Profil}
        options={{headerShown: false}}
      />
      <AccountStack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={({route}) => ({
          title: route.name,
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
    </AccountStack.Navigator>
  );
};

const MainStack = props => {
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Beranda"
        component={HomeStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';

            if (
              routeName === 'ChatBotScreen' ||
              routeName === 'Info Obat' ||
              routeName === 'Detail Obat' ||
              routeName === 'Develop' ||
              routeName === 'Layanan Kesehatan' ||
              routeName === 'SearchMedicine' ||
              routeName === 'DetailSearchMedicine' ||
              routeName === 'SearchLayananKesehatan' ||
              routeName === 'DetailLayananKesehatan'
            ) {
              return false;
            }

            return true;
          })(route),
        })}
        tabBarOptions={{
          style: {
            position: 'absolute',
            color: 'red',
            backgroundColor: 'yellow',
          },
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SOSStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'InputNoTelp' || routeName === 'ContactList') {
              return false;
            }

            return true;
          })(route),
        })}
      />

      <Tab.Screen
        name="Profil"
        component={AccountStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Edit Profile') {
              return false;
            }

            return true;
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
