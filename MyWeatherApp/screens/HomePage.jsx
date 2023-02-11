import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';

const HomePage = ({navigation}) => {
  const val = new Animated.Value(1);
  const Spring = () => {
    val.setValue(1);
    Animated.spring(val, {
      toValue: 1.1,
      bounciness: 30,
      speed: 10,
      useNativeDriver: true,
    }).start(() => Spring());
  };

  const fade = new Animated.Value(0);
  const fading = fade.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.3, 1],
  });

  const Fading = () => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 2,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Fading();
    });
  };

  useEffect(() => {
    Fading();
    Spring();
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assests/w1.png')} style={styles.img}>
        <Animated.View style={{opacity: fading, transform: [{scale: val}]}}>
          <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
            <Text style={styles.text}>START</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    height: 50,
    width: 200,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default HomePage;
