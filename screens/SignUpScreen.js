import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Make sure this import is correct
import { doc, setDoc } from 'firebase/firestore';
import SignUpStyle from '../styles/SignUpStyle'; // Import the styles from SignUpStyle.js

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleCreateAccount = () => {
    setEmailError('');
    setPasswordError('');

    if (!isValidEmail(email) || !isValidPassword(password) || nickname.trim() === ''){
      setEmailError('Invalid email, password or nickname');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, 'users', user.uid);

        setDoc(userRef, {
          email: user.email,
          nickname: nickname.trim(),
          // Add more user data as needed
        })
          .then(() => {
            navigation.navigate('SignIn');
          })
          .catch((error) => {
            console.error('Error storing user data:', error);
            setEmailError('Failed to store user data');
          });
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        setEmailError('Failed to create account: ' + error.message);
      })
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={SignUpStyle.container}>
      <TouchableOpacity style={SignUpStyle.backButton} onPress={() => navigation.goBack()}>
        <Text style={SignUpStyle.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={SignUpStyle.logoContainer}>
        <Image source={require('../assets/logo.png')} style={SignUpStyle.logo} />
      </View>
      <TextInput
        style={SignUpStyle.input}
        placeholder="Enter your email"
        placeholderTextColor="white"
        onChangeText={(text) => setEmail(text)}
      />
 
      {emailError ? <Text style={SignUpStyle.errorText}>{emailError}</Text> : null}
      <View style={SignUpStyle.passwordContainer}>
        <TextInput
          style={SignUpStyle.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={toggleSecureTextEntry} style={SignUpStyle.passwordToggle}>
          <FontAwesome
            name={secureTextEntry ? 'eye' : 'eye-slash'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={SignUpStyle.errorText}>{passwordError}</Text> : null}
      <TextInput
        style={SignUpStyle.input} // You can adjust the style as needed
        placeholder="Enter your nickname" // Step 2: Add nickname input
        placeholderTextColor="white"
        onChangeText={(text) => setNickname(text)} // Update nickname state
      />
      <TouchableOpacity style={SignUpStyle.createAccountButton} onPress={handleCreateAccount}>
        <Text style={SignUpStyle.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      <Text style={SignUpStyle.signInText}>
        Already have an account?{' '}
        <Text style={SignUpStyle.signInLink} onPress={handleSignIn}>Sign In</Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;
