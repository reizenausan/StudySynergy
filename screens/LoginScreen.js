import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyle from '../styles/LoginStyle'; // Import the styles

const LoginScreen = () => {
  const navigation = useNavigation();

  const goToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={LoginStyle.container}>
      <Image source={require('../assets/logo.png')} style={LoginStyle.logo} />
      <Text style={LoginStyle.appName}>Your Academic Success Companion!</Text>
      <TouchableOpacity style={LoginStyle.button} onPress={goToSignIn}>
        <Text style={LoginStyle.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={LoginStyle.button1} onPress={goToSignUp}>
        <Text style={LoginStyle.buttonText1}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
