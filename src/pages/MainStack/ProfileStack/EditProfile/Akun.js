import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import colors from '../../../../assets/colors';
import {Avatar} from '../../../../assets';
const Akun = props => {
  // console.log(props.props.params);
  const item = props.props.params;
  const [data, setData] = useState({
    email: item.email,
    password: '',
    ConfirmPassword: '',
    check_TextEmail: false,
    secureTextEntry: true,
    emailIsEmpty: false,
    passwordIsEmpty: false,
  });
  console.log();
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image source={Avatar} style={{width: 60, height: 60}} />
        </View>
        <View style={styles.form}>
          {/* // Input Form for Username */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Email</Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              style={styles.InputText}
              value={data.email}
              placeholderTextColor="black"
              editable={false}
              // onChangeText={val => textInputChangeEmail(val)}
            />
          </View>

          {/* // Input Form for Password */}
          <View style={styles.TextInput}>
            <Text style={{fontFamily: 'Karla-Medium'}}>Kata sandi</Text>
          </View>
          <View style={styles.ViewInput}>
            <TextInput
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.InputText}
              value="asdasd"
              editable={false}
              placeholderTextColor="grey"
              autoCapitalize="none"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
    marginVertical: 20,
    alignItems: 'center',
  },
  wrapper: {
    marginHorizontal: 30,
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.gray_dark,
    backgroundColor: colors.gray,
    borderRadius: 10,
    paddingVertical: 2,
  },
  InputText: {
    flex: 1,
    alignItems: 'center',
    width: 270,
    height: 40,
    paddingHorizontal: 10,
    color: colors.black,
  },
  TextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
