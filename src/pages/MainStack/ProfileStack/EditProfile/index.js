import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import colors from '../../../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Akun from './Akun';
import Biodata from './Biodata';
import LoadingV2 from '../../../../components/Universal/LoadingV2';

const EditProfile = props => {
  const [choice, setChoice] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const On = () => {
    setChoice(false);
  };
  const Off = () => {
    setChoice(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.choice}>
          <TouchableOpacity
            onPress={() => {
              {
                choice ? On() : Off();
              }
            }}>
            <View style={choice ? styles.button : styles.buttonOff}>
              <Text style={choice ? styles.titleButton : styles.titleButtonOff}>
                Akun
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              {
                choice ? On() : Off();
              }
            }}>
            <View style={choice ? styles.buttonOff : styles.button}>
              <Text style={choice ? styles.titleButtonOff : styles.titleButton}>
                Biodata
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {choice ? (
            <Akun props={props.route} />
          ) : (
            <Biodata
              props={props.route}
              handleIsLoading={isLoading => setIsloading(isLoading)}
            />
          )}
        </View>
      </ScrollView>
      {isLoading ? <LoadingV2 loading={isLoading} /> : null}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  choice: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: wp('42%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange,
  },
  buttonOff: {
    width: wp('42%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.soft_gray,
  },
  titleButton: {
    color: colors.white,
    fontFamily: 'Karla-Bold',
  },
  titleButtonOff: {
    color: colors.black,
    fontFamily: 'Karla-Bold',
  },
  header: {
    backgroundColor: colors.soft_gray,

    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 16,
  },
  contents: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
  },
  bigTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.soft_gray,
    paddingTop: 20,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
});
