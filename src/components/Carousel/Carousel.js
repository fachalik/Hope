import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import CarouselItem from './CarouselItem';
import colors from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, heigth} = Dimensions.get('window');
const Carousel = ({data}) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(data);
  useEffect(async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      if (userToken == null) {
        setDataList(data);
        infiniteScroll(dataList);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (data && data.length) {
    return (
      <View style={{}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'normal'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <CarouselItem item={item} />;
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />
        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: colors.yellow,
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  console.log('Please provide Images');
  return null;
};

const styles = StyleSheet.create({
  dotView: {flexDirection: 'row', justifyContent: 'center',marginTop:-60},
});

export default Carousel;
