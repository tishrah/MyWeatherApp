import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

const CurrentReport = ({navigation}) => {
  const [current, setCurrent] = useState();
  const [city, setCity] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(data => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      const location = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      const currentWeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

      fetch(currentWeatherURL)
        .then(response => response.json())
        .then(json => setCurrent(json))
        .catch(e => Alert.alert(e));

      fetch(location)
        .then(response => response.json())
        .then(json => setCity(json))
        .catch(e => Alert.alert(e));
    });
  }, []);

  const transformData = data => {
    let list = [];

    for (let i = 0; i < data.hourly.time.length; i++) {
      const obj = {
        time: data.hourly.time[i],
        temp: data.hourly.temperature_2m[i],
        humid: data.hourly.relativehumidity_2m[i],
        wind: data.hourly.windspeed_10m[i],
      };
      list.push(obj);
    }
    return list;
  };

  const condition = value => {
    if (value == '06:00' || value == '18:00')
      return require('../assests/riseset.png');
    if (value > '06:00' && value < '18:00')
      return require('../assests/sunsmall.png');
    else return require('../assests/moon.png');
  };

  const date = value => {
    return (
      value.substring(8) +
      '-' +
      value.substring(5, 7) +
      '-' +
      value.substring(0, 4)
    );
  };

  return (
    <View style={{flex: 1}}>
      {!current && (
        <ActivityIndicator size="large" color="navy" style={{flex: 1}} />
      )}
      {current && (
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View style={styles.current}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text style={[styles.txt, {fontSize: 50}]}>
                {current.current_weather.temperature}
                <Text style={styles.txt}> °C</Text>
              </Text>

              <Text style={[styles.txt, {alignSelf: 'flex-end'}]}>
                {city.locality} , {city.countryName}
              </Text>
            </View>

            <Text style={styles.txt}>
              Windspeed : {current.current_weather.windspeed} km/h
            </Text>
          </View>
          <View>
            <Text style={styles.forecast}>Hourly Forecast</Text>
            <FlatList
              horizontal
              data={transformData(current)}
              renderItem={({item}) => (
                <View style={styles.list}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WeatherCard', {
                        temp: item.temp,
                        humid: item.humid,
                        wind: item.wind,
                      })
                    }>
                    <Text style={styles.text}>
                      {date(item.time.substring(0, 10))}
                    </Text>
                    <Image
                      source={condition(item.time.substring(11))}
                      style={styles.forecast_image}
                    />
                    <Text style={styles.text}>{item.time.substring(11)}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    borderRadius: 20,
    backgroundColor: '#B7EAFA',
  },
  text: {
    alignSelf: 'center',
    color: 'navy',
    fontSize: 15,
    fontWeight: '600',
  },
  txt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'center',
    color: 'midnightblue',
    fontFamily: 'serif',
    paddingVertical: 5,
  },
  current: {
    height: 150,
    borderRadius: 5,
    paddingVertical: 10,
    margin: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'navy',
  },
  forecast: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Georgia',
    color: 'black',
    fontWeight: '600',
    backgroundColor: 'azure',
    borderBottomWidth: 3,
    margin: 10,
    padding: 10,
  },
  forecast_image: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    margin: 5,
  },
});

export default CurrentReport;
