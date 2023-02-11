import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomePage';
import WeatherPage from './screens/WeatherPage';
import WeatherCard from './screens/WeatherCard';
import SplashScreen from './screens/SplashScreen';
import PastData from './screens/PastData';

export const SplashContext = React.createContext([true, () => {}]);

const Stack = createNativeStackNavigator();
const App = () => {
  const showSplashScreen = useState(true);

  return (
    <SplashContext.Provider value={showSplashScreen}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            {showSplashScreen[0] && (
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{headerShown: false}}
              />
            )}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Weather"
              component={WeatherPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WeatherCard"
              component={WeatherCard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PastData"
              component={PastData}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SplashContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
