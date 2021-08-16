/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ToastAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './context';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {Splash} from '../pages';
import config from '../../config';
import axios from 'react-native-axios';
const Router = ({navigation}) => {
  const [isSplash, setIsSplash] = useState(true);
  const [data, setData] = useState({
    user: {
      email: '',
      date_joined: '',
    },
    first_name: '',
    last_name: '',
    weight: '',
    height: '',
    job: '',
    activities: '',
    disease_history: '',
  });
  const intialLoginState = {
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
        };
      case 'REGIST':
        return {
          ...prevState,
          userName: action.id,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    intialLoginState,
  );
  const authContext = React.useMemo(() => ({
    SignIn: async (email, password) => {
      let userToken;
      let RefreshToken;
      userToken = null;
      RefreshToken = null;
      await axios
        .post(config.API_URL + 'auth/login', {
          email: email,
          password: password,
        })
        .then(function (response) {
          userToken = response.data.result.access;
          RefreshToken = response.data.result.refresh;
          AsyncStorage.setItem('RefreshToken', RefreshToken);
          AsyncStorage.setItem('userToken', userToken);
        })
        .catch(function (error) {
          ToastAndroid.show(
            'Email dan Password yang anda masukkan tidak terdaftar',
            ToastAndroid.LONG,
          );
        });
      if (userToken) {
        await axios
          .get(config.API_URL + 'user/me/', {
            headers: {Authorization: 'Bearer ' + userToken},
          })
          .then(function (response) {
            const getData = response.data.result;
            console.log('Data UserProfile', getData);
            setData({
              ...data,
              user: {
                email: getData.email,
                date_joined: getData.CreatedAt,
              },
              first_name: getData.profile.first_name,
              last_name: getData.profile.last_name,
              weight: getData.profile.weight,
              height: getData.profile.height,
              job: getData.profile.job,
              activities: getData.profile.activities,
              disease_history: getData.profile.disease_history,
            });
            AsyncStorage.setItem('UserProfile', JSON.stringify(getData))
              .then(() => {
                console.log('UserProfile was success saved in local');
              })
              .catch(() => {
                console.log('There was some error in UserProfile');
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      dispatch({type: 'LOGIN', id: email, token: userToken});
    },
    SignUp: async (email, password, confirmSuccess) => {
      await dispatch({type: 'REGIST', id: email});
    },
    SignOut: async () => {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
  }));

  useEffect(() => {
    let isUnmount = false;
    if (!isUnmount) {
      setTimeout(() => {
        setIsSplash(false);
      }, 1500);
    }
    return () => {
      isUnmount = true;
    };
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        let profile = await AsyncStorage.getItem('UserProfile');
        let parseProfile = JSON.parse(profile);
        setData({
          ...data,
          user: {
            email: parseProfile.user.email,
            date_joined: parseProfile.user.date_joined,
          },
          first_name: parseProfile.first_name,
          last_name: parseProfile.last_name,
          weight: parseProfile.weight,
          height: parseProfile.height,
          job: parseProfile.job,
          activities: parseProfile.activities,
          disease_history: parseProfile.disease_history,
        });
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIVE_TOKEN', token: userToken});
    }, 1000);
  }, [data]);
  if (Platform.OS === 'android') {
    if (isSplash) {
      return <Splash />;
    }
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null || loginState === undefined ? (
          <MainStack data={data} />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Router;
