import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import TimerScreen from './screens/TimerScreen.js';
import PomodoroScreen from './screens/PomodoroScreen.js';
import BlurtScreen from './screens/BlurtScreen.js';
import AboutUs from './screens/AboutUs.js'
import { Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';



const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  // Load fonts asynchronously
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
        });
        
        // Check login state
        const userToken = await AsyncStorage.getItem('userToken');
        setIsUserLoggedIn(userToken !== null);
        
        setFontsLoaded(true);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // Render the app only when fonts are loaded and login state is checked
  if (!fontsLoaded || isUserLoggedIn === null) {
    return null; // You can return a loading screen here if needed
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isUserLoggedIn ? 'Dashboard' : 'Login'}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Timer"
            component={TimerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pomodoro"
            component={PomodoroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Blurt"
            component={BlurtScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
