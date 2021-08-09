import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../assets/colors';

const PasswordStrengthIndicator = ({
  validity: {minChar, number, specialChar},
}) => {
  return (
    <View>
      <Text>Password must contain:</Text>
      <Text>
        <PasswordStrengthIndicatorItem
          isValid={minChar}
          text="Minimum 8 Karakter"
        />
      </Text>
      <Text>
        <PasswordStrengthIndicatorItem
          isValid={number}
          text="Memiliki kurang lebih 1 angka"
        />
      </Text>
      <Text>
        <PasswordStrengthIndicatorItem
          isValid={specialChar}
          text="Memiliki kurang lebih 1 karakter spesial"
        />
      </Text>
    </View>
  );
};

const PasswordStrengthIndicatorItem = ({isValid, text}) => {
  return (
    <Text
      style={
        isValid
          ? styles.success
          : isValid !== null
          ? styles.danger
          : styles.none
      }>
      {text}
    </Text>
  );
};

export default PasswordStrengthIndicator;

const styles = StyleSheet.create({
  success: {
    color: 'green',
  },
  danger: {
    color: 'red',
  },
  none: {
    color: colors.gray,
  },
});
