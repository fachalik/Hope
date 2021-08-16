import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  LogBox,
} from 'react-native';
import MainLayout from '../../../../components/MainLayout';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactList = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    await setIsLoading(true);
    let contactArr = [];
    let i = 0;
    const result = await Contacts.getAll();
    await result.forEach(item => {
      if (item.phoneNumbers.length !== 0) {
        contactArr = [
          ...contactArr,
          {
            contactId: item.rawContactId,
            displayName: item.displayName,
            familyName: item.familyName,
            phoneNumber: item.phoneNumbers[0],
          },
        ];
      }
    });
    await setData(contactArr);
    await setFilter(contactArr);
    await setIsLoading(false);
  };

  const searchQuery = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.displayName
          ? item.displayName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilter(newData);
      setQuery(text);
    } else {
      setFilter(data);
      setQuery(text);
    }
  };

  const doSomething = async (router, nomer) => {
    if (router === 'Teman') {
      await AsyncStorage.setItem('NoTeman', nomer);
    }
    if (router === 'OrangTua') {
      await AsyncStorage.setItem('NoOrtu', nomer);
    }
    await navigation.pop();
  };

  const renderItem = ({item}) => {
    return (
      <>
        {item.displayName !== null ? (
          <TouchableOpacity
            key={item.contactId}
            onPress={() =>
              doSomething(route.params.request, item.phoneNumber.number)
            }>
            <View style={styles.Kontak}>
              <View style={styles.IconNama}>
                <Text>
                  {item.displayName.charAt(0) !== '(' &&
                  item.familyName.charAt(0) !== '('
                    ? item.displayName.charAt(0).toUpperCase() +
                      ' ' +
                      item.familyName.charAt(0).toUpperCase()
                    : item.displayName.charAt(0).toUpperCase() +
                      ' ' +
                      item.familyName.charAt(1).toUpperCase()}
                </Text>
              </View>
              <View style={styles.itemKontak}>
                <Text style={styles.itemName}>{item.displayName}</Text>
                <Text style={styles.itemNumber}>{item.phoneNumber.number}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  return (
    <MainLayout boolean={isLoading}>
      <View style={styles.searchBar}>
        <View style={styles.viewInputSearch}>
          <View style={{marginRight: 10}}>
            <Icon name="search1" size={20} color={colors.gray} />
          </View>
          <TextInput
            style={styles.InputText}
            placeholder="Cari nama atau nomor telepon"
            placeholderTextColor="grey"
            keyboardType="name-phone-pad"
            onChangeText={val => searchQuery(val)}
          />
        </View>
      </View>
      <FlatList
        data={filter}
        renderItem={renderItem}
        keyExtractor={item => item.contactId}
      />
    </MainLayout>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  IconNama: {
    backgroundColor: colors.orange,
    height: 50,
    width: 50,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.soft_gray,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  viewInputSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Kontak: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: colors.soft_gray,
  },
  itemKontak: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  itemNumber: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    color: colors.gray_dark,
  },
});
