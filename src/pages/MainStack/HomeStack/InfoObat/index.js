import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import dummyData from './dummyData';
import BottomSheet from 'reanimated-bottom-sheet';
import LoadingV2 from '../../../../components/Universal/LoadingV2';
import Animated, {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Icon from 'react-native-vector-icons/AntDesign';
const InfoObat = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([]);
  const [detail, setDetail] = useState({
    name: '',
    harga: '',
    deskrips: '',
    manfaat: '',
    komposisi: '',
    dosis: '',
    penyajian: '',
    efekSamping: '',
    produsen: '',
    perhatian: '',
    kategori: '',
  });
  const request = route.params;
  console.log(request.request);

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{marginHorizontal: 30}}>
        <Text style={styles.bigTitle}>{detail.name}</Text>
        <Text style={styles.title}>Harga</Text>
        <Text style={styles.contents}>{detail.harga}</Text>
        <Text style={styles.title}>Manfaat</Text>
        <Text style={styles.contents}>{detail.manfaat}</Text>
        <Text style={styles.title}>Komposisi</Text>
        <Text style={styles.contents}>{detail.komposisi}</Text>
        <Text style={styles.title}>Dosis</Text>
        <Text style={styles.contents}>{detail.dosis}</Text>
        <Text style={styles.title}>Penyajian</Text>
        <Text style={styles.contents}>{detail.penyajian}</Text>
        <Text style={styles.title}>Efek Samping</Text>
        <Text style={styles.contents}>{detail.efekSamping}</Text>
        <Text style={styles.title}>Produsen</Text>
        <Text style={styles.contents}>{detail.produsen}</Text>
        <Text style={styles.title}>Perhatian</Text>
        <Text style={styles.contents}>{detail.perhatian}</Text>
        <Text style={styles.title}>Perhatian</Text>
        <Text style={styles.contents}>{detail.kategori}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const handleKategori = () => {
    navigation.navigate('Kategori obat');
  };

  const handleSnap = item => {
    bs.current.snapTo(0);
    setDetail({
      ...data,
      name: item.name,
      harga: item.price_range,
      deskripsi: item.description,
      manfaat: item.benefits,
      komposisi: item.composition,
      dosis: item.dosage,
      penyajian: item.serving,
      efekSamping: item.side_effect,
      produsen: item.producer,
      perhatian: item.consideration,
      kategori: item.medicine_group,
    });
  };
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  // useEffect(async () => {
  //   setIsLoading(true);
  //   var userToken = await AsyncStorage.getItem('userToken');
  //   const RefreshToken = await AsyncStorage.getItem('RefreshToken');
  //   await console.log(RefreshToken + ' refresh');
  //   await axios
  //     .post(config.API_URL + 'auth/login/refresh/', {
  //       refresh: RefreshToken,
  //     })
  //     .then(function (response) {
  //       // console.log(response.data);
  //       console.log(response.data);
  //       AsyncStorage.setItem('userToken', response.data.access);
  //       userToken = response.data.access;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   await axios
  //     .get(config.API_URL + 'medicine/?kind=AS', {
  //       headers: {Authorization: 'Bearer ' + userToken},
  //     })
  //     .then(function (response) {
  //       // console.log(response.data);
  //       setIsData(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   await setIsLoading(false);
  // }, [null]);
  const Obat = () => {
    return data.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            handleSnap(item);
          }}>
          <View
            style={{
              width: wp('40%'),
              height: hp('20%'),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.soft_gray,
              borderRadius: 10,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Karla-Bold',
                fontSize: 10,
                textAlign: 'center',
                width: 100,
              }}>
              {item.name}
            </Text>
            <Image
              source={{uri: item.image}}
              style={{width: 100, height: 100, resizeMode: 'cover'}}
            />

            <Text style={{fontFamily: 'Karla-Bold', fontSize: 10}}>
              {item.price_range}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const DisplayCategory = () => {
    return dummyData.slice(0, 5).map(item => {
      return (
        <TouchableOpacity
          key={item.sfMedicinefor}
          onPress={() => {
            navigation.navigate('Detail Obat', {
              request: item.sfMedicinefor,
            });
          }}>
          <View
            style={{
              width: 105,
              height: 105,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: colors.soft_gray,
              borderRadius: 10,
              marginRight: 5,
            }}>
            <Image
              source={item.image}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
            <Text style={{fontFamily: 'Karla-Bold', fontSize: 12}}>
              {item.medicinefor}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[500, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchMedicine');
          }}>
          <View style={styles.searchBar}>
            <View style={{marginRight: 10}}>
              <Icon name="search1" size={20} color={color.yellow} />
            </View>
            <View>
              <Text>Cari Produk Kesehatan</Text>
            </View>
          </View>
        </TouchableOpacity>

        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center'}}>
              Kategori
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleKategori();
              }}>
              <View
                style={{
                  backgroundColor: colors.soft_gray,
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text style={{marginHorizontal: 5, color: colors.black}}>
                  Selengkapnya
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.itemlayanan}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <DisplayCategory />
            </ScrollView>
          </View>
          <Text style={{fontFamily: 'Karla-Bold', marginTop: 20}}>
            Pilihan produk kesehatan
          </Text>
          <View style={styles.itemObat}>{!isLoading ? <Obat /> : null}</View>
        </ScrollView>
      </View>
      {isLoading ? <LoadingV2 loading={isLoading} /> : null}
    </View>
  );
};

export default InfoObat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemlayanan: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  itemObat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  header: {
    backgroundColor: colors.gray,
    shadowRadius: 2,
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
    backgroundColor: colors.gray,
    paddingTop: 20,
  },
});
