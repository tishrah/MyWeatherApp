import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';

const WeatherCard = ({route}) => {
  const {temp, humid, wind} = route.params;

  const val = new Animated.Value(0);
  const fade = new Animated.Value(0);

  const rotate1 = val.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  const rotate2 = val.interpolate({
    inputRange: [0, 360],
    outputRange: ['360deg', '0deg'],
  });
  const fading = fade.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 1, 0.2],
  });

  const Fade = () => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => Fade());
  };

  const Rotate = () => {
    Animated.timing(val, {
      toValue: 360,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => Rotate(val.setValue(0)));
  };

  useEffect(() => {
    Rotate();
    Fade();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assests/bg.png')}
        style={styles.background}>
        <Animated.View
          style={[
            {
              transform: [{rotateY: rotate1}],
            },
            styles.img,
          ]}>
          <Image
            style={{height: 150, width: 150}}
            source={require('../assests/sun.png')}
          />
        </Animated.View>

        <View style={styles.reportBack}>
          <Animated.View style={{opacity: fading}}>
            <Text style={styles.headingText}>WEATHER REPORT</Text>
          </Animated.View>

          <View style={styles.report}>
            <Text style={[styles.text, {color: 'darkblue'}]}>
              TEMPERATURE : {temp} °C
            </Text>

            <Text style={[styles.text, {color: 'blue'}]}>
              HUMIDITY : {humid} %
            </Text>

            <Text style={[styles.text, {color: 'royalblue'}]}>
              WINDSPEED : {wind} km/h
            </Text>
          </View>
        </View>
        <Animated.View
          style={[
            {
              transform: [{rotateY: rotate2}],
            },
            styles.img,
          ]}>
          <Image
            style={{height: 150, width: 150}}
            source={require('../assests/snowflake.png')}
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 3,
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'serif',
  },
  headingText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Cochin',
    padding: 10,
    fontWeight: '900',
    color: 'darkblue',
  },
  report: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 25,
    padding: 30,
    width: 300,
  },
  reportBack: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'azure',
    borderRadius: 40,
    padding: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: 'navy',
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherCard;
