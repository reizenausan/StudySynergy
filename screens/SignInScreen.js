import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import signInStyles from '../styles/SignInStyle';

const SignInScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, check if the email matches the one in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        getDoc(userDocRef)
          .then((userDoc) => {
            if (userDoc.exists() && userDoc.data().email === email) {
              navigation.navigate('Dashboard');
            }
          })
          .catch((error) => {
            console.error('Error checking user data:', error);
          });
      }
    });
  

    return unsubscribe;
  }, []);
  

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const checkUserData = async (user) => {
    if (user) {
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.uid);

      try {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.email === email) {
            navigation.navigate('Dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    }
  };

  const handleSignIn = () => {
    setError(''); // Clear previous errors
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        checkUserData(user).then();
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        setError('Error signing in: ' + error.message); // Set a more specific error message
      });
  };

  return (
    <View style={signInStyles.container}>
      <TouchableOpacity style={signInStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={signInStyles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={signInStyles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={signInStyles.logo} />
      </View>
      <TextInput
        style={signInStyles.input}
        placeholder="Enter your email"
        placeholderTextColor="white"
        onChangeText={(text) => setEmail(text)} // Capture the entered email
      />
      <View style={signInStyles.passwordContainer}>
        <TextInput
          style={signInStyles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => setPassword(text)} // Capture the entered password
        />
        <TouchableOpacity onPress={toggleSecureTextEntry} style={signInStyles.passwordToggle}>
          <FontAwesome
            name={secureTextEntry ? 'eye' : 'eye-slash'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={signInStyles.signInButton} onPress={handleSignIn}>
    <Text style={signInStyles.signInText}>Sign In</Text>
  </TouchableOpacity>
  {error ? <Text style={signInStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default SignInScreen;
