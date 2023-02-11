import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import CurrentReport from './CurrentReport';

import Geolocation from '@react-native-community/geolocation';

const WeatherPage = ({navigation}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  Geolocation.getCurrentPosition(data => {
    setLatitude(data.coords.latitude);
    setLongitude(data.coords.longitude);
  });

  const fade = new Animated.Value(0);
  const fading = fade.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.2, 1],
  });

  const Fading = () => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Fading();
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    Fading();
  });

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ImageBackground source={require('../assests/bg.png')} style={styles.img}>
        <Animated.View style={[{opacity: fading, flex: 1}, styles.imgView]}>
          <Image style={styles.img1} source={require('../assests/w6.png')} />
        </Animated.View>

        <View style={{flex: 4}}>
          <CurrentReport navigation={navigation} />
        </View>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('PastData', {lat: latitude, long: longitude});
            }}>
            <Text style={styles.text}>Past 10 Days Hourly Details</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
  },
  img1: {
    height: 125,
    width: 125,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    borderRadius: 20,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: 'navy',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'navy',
  },
});

export default WeatherPage;
