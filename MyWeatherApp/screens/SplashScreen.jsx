import React, {useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import {SplashContext} from '../App';

const SplashScreen = ({navigation}) => {
  const {showSplashScreen, setShowSplashScreen} = useContext(SplashContext);

  const fade = new Animated.Value(0);
  const trans = new Animated.Value(0);
  const val = new Animated.Value(0);

  const fading = fade.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 0.5, 1],
  });
  const translate1 = trans.interpolate({
    inputRange: [0, 25, 50, 75, 100],
    outputRange: [120, 90, 60, 30, 0],
  });
  const translate2 = trans.interpolate({
    inputRange: [0, 25, 50, 75, 100],
    outputRange: [-120, -90, -60, -30, 0],
  });

  const Translate = () => {
    trans.setValue(0);
    Animated.timing(trans, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  const Fading = () => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 4,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  };
  const Spring = () => {
    val.setValue(0);
    Animated.spring(val, {
      toValue: 1,
      speed: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Translate();
    Fading();
    Spring();
    setTimeout(() => {
      setShowSplashScreen(false);
      navigation.navigate('Home');
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assests/w10.png')}
        style={styles.background}>
        <Animated.View
          style={{
            opacity: fading,
            transform: [{scale: val}],
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image source={require('../assests/w9.png')} />
        </Animated.View>
        <View style={{flex: 1}}>
          <Animated.View style={{transform: [{translateX: translate1}]}}>
            <Text style={styles.txt1}>WEATHER</Text>
          </Animated.View>
          <Animated.View style={{transform: [{translateX: translate2}]}}>
            <Text style={styles.txt2}>FORECAST</Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt2: {fontSize: 25, color: 'yellow', textAlign: 'center'},
});
export default SplashScreen;
