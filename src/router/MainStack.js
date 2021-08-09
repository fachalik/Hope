import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {BottomNavigator} from '../components';
import {
  Home,
  Account,
  ChatBot,
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
} from '../pages';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();
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
        name="Kategori obat"
        component={KategoriObat}
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
      />
    </HomeStack.Navigator>
  );
};

const ChatStackScreen = (props, {navigation}) => {
  const route = useRoute();
  return (
    <ChatStack.Navigator initialRouteName="Chatbot">
      <ChatStack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{headerShown: false}}
      />
      <ChatStack.Screen
        name="Konsultasi"
        component={ChatBotScreen}
        options={({route}) => ({
          title: route.name,
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
      <ChatStack.Screen
        name="Konsultasi Dokter"
        component={ChatDoctorScreen}
        options={({route}) => ({
          title: route.name,
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
      <ChatStack.Screen
        name="Konsultasi Psikolog"
        component={ChatPsikologScreen}
        options={({route}) => ({
          title: route.name,
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
    </ChatStack.Navigator>
  );
};

const AccountStackScreen = (props, {navigation}) => {
  return (
    <AccountStack.Navigator initialRouteName="Account">
      <AccountStack.Screen
        name="Account"
        component={Account}
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
      initialRouteName="Home"
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="ChatBot"
        component={ChatStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (
              routeName === 'Konsultasi' ||
              routeName === 'Konsultasi Dokter' ||
              routeName === 'Konsultasi Psikolog'
            ) {
              return false;
            }

            return true;
          })(route),
        })}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        initialParams={props.data}
        options={({route}) => ({
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';

            if (
              routeName === 'SearchMedicine' ||
              routeName === 'Info Obat' ||
              routeName === 'Detail Obat' ||
              routeName === 'Layanan Kesehatan' ||
              routeName === 'DetailSearchMedicine' ||
              routeName === 'DetailSearchLayananKesehatan' ||
              routeName === 'SearchLayananKesehatan' ||
              routeName === 'InputNoTelp'
              // routeName === 'SosScreen'
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
        name="Account"
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
