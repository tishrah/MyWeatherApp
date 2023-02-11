import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

const PastData = ({route, navigation}) => {
  const [data, setData] = useState();
  const {lat, long} = route.params;

  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&past_days=10&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

  useEffect(() => {
    fetch(weatherURL)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(e => Alert.alert(e));
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
    <View style={styles.container}>
      <Text style={styles.heading}>Last 10 Days Details</Text>
      {!data && (
        <ActivityIndicator
          size="large"
          color="deepturquoise"
          style={{flex: 1, justifyContent: 'center'}}
        />
      )}
      {data && (
        <FlatList
          data={transformData(data)}
          renderItem={({item}) => (
            <View style={styles.list}>
              <TouchableHighlight
                style={{borderRadius: 20}}
                underlayColor="#C9F7FF"
                onPress={() =>
                  navigation.navigate('WeatherCard', {
                    temp: item.temp,
                    humid: item.humid,
                    wind: item.wind,
                  })
                }>
                <View style={styles.tile}>
                  <Text style={styles.text}>
                    DATE : {date(item.time.substring(0, 10))}
                  </Text>
                  <Text style={styles.text}>
                    TIME : {item.time.substring(11)} hrs
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A3F2FE',
    flex: 1,
  },
  list: {
    borderRadius: 20,
    margin: 5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'navy',
  },
  text: {
    color: 'navy',
    fontSize: 15,
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: 'navy',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'azure',
    height: 100,
    textAlignVertical: 'center',
    borderRadius: 20,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'cyan',
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
});
export default PastData;
