import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../../../../assets/colors';
import RumahSakit from './RumahSakit';
import Ambulance from './Ambulance';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

const LayananKesehatan = ({route, navigation}) => {
  const [choice, setChoice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState({
    name: '',
    notelp: '',
    alamat: '',
    tentang: '',
    layanan: '',
    layananpoliklinik: [],
  });
  const [checkBox, setCheckBox] = useState({
    polBedah: false,
    polSaraf: false,
    dokterUmum: false,
    polGigiSpes: false,
    polAnak: false,
    polGizi: false,
    polMata: false,
    MCU: false,
    polRadiologi: false,
    vaksinasi: false,
    polJantung: false,
    polKulit: false,
    polParu: false,
    polPenyDalam: false,
    polJiwa: false,
    polFisik: false,
    polTHT: false,
    polAnestesiologi: false,
    polKandungan: false,
  });
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{marginHorizontal: 30}}>
        <Text style={styles.bigTitle}>{detail.name}</Text>
        <Text style={styles.title}>No. Telpon</Text>
        <Text style={styles.contents}>{detail.notelp}</Text>
        <Text style={styles.title}>Alamat</Text>
        <Text style={styles.contents}>{detail.alamat}</Text>
        <Text style={styles.title}>Tentang</Text>
        <Text style={styles.contents}>{detail.tentang}</Text>
        {detail.layanan === undefined ? null : (
          <Text style={styles.title}>Layanan</Text>
        )}
        {detail.layanan === undefined ? null : (
          <FlatList
            data={detail.layanan}
            key={detail.notelp}
            renderItem={({item}) => (
              <View style={styles.column}>
                <View key={item} style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{'\u2022' + ' '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text>
                      <Text style={styles.contents}>{item}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
        {detail.layananpoliklinik === undefined ? null : (
          <Text style={styles.title}>Layanan Poliklink</Text>
        )}
        {detail.layananpoliklinik === undefined ? null : (
          <FlatList
            data={detail.layananpoliklinik}
            key={detail.notelp}
            renderItem={({item}) => (
              <View style={styles.column}>
                <View key={item} style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{'\u2022' + ' '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text>
                      <Text style={styles.contents}>{item}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
  // const renderInnerFilter = () => (
  //   <View style={styles.panel}>
  //     <View style={{marginHorizontal: 30}}>
  //       <Text style={styles.bigTitle}>{}</Text>
  //     </View>
  //   </View>
  // );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const bs = React.createRef();
  // const bsFilter = React.createRef();
  const fall = new Animated.Value(1);

  const On = () => {
    setChoice(false);
  };
  const Off = () => {
    setChoice(true);
  };
  const handleSnapRumahSakit = () => {
    bs.current.snapTo(0);
  };
  const handleFilter = () => {
    // bsFilter.current.snapTo(0);
    alert('Filter belum tersedia');
  };
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[450, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchLayananKesehatan');
          }}>
          <View style={styles.searchBar}>
            <View style={{marginRight: 10}}>
              <Icon name="search1" size={20} color={colors.yellow} />
            </View>
            <View>
              <Text>Cari Layanan Kesehatan</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{alignSelf: 'center'}}>Cari layanan kesehatan</Text>
          <TouchableOpacity
            style={{backgroundColor: colors.gray, padding: 10}}
            onPress={() => handleFilter()}>
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.choice}>
          <TouchableOpacity
            onPress={() => {
              {
                choice ? On() : Off();
              }
            }}>
            <View style={choice ? styles.button : styles.buttonOff}>
              <Text style={choice ? styles.titleButton : styles.titleButtonOff}>
                Rumah Sakit
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
                Ambulance
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
      <ScrollView style={styles.wrapper}>
        <View>
          {choice ? (
            !isLoading ? (
              <RumahSakit
                handleRumahSakit={detail => setDetail(detail)}
                handletrigger={handleSnapRumahSakit}
                handleI
              />
            ) : null
          ) : !isLoading ? (
            <Ambulance />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default LayananKesehatan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  choice: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: colors.yellow,
  },
  buttonOff: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: colors.gray,
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
    backgroundColor: colors.gray,

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
