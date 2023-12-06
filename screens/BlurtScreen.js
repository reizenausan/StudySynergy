import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const BlurtScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blurts, setBlurts] = useState([]);

  const handleMenuItemClick = (menuItem) => {
    setIsMenuOpen(false);
    navigation.navigate(menuItem);
  };

  const handleBlurtSubmit = () => {
    if (inputText.trim() !== '') {
      setBlurts((prevBlurts) => [inputText, ...prevBlurts]);
      setInputText('');
    }
  };

  const handleClearAll = () => {
    setBlurts([]);
  };

  const renderMenu = () => {
    if (!isMenuOpen) return null;
  
    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => handleMenuItemClick('Dashboard')}>
          <Text style={styles.menuItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuItemClick('Timer')}>
          <Text style={styles.menuItem}>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuItemClick('Pomodoro')}>
          <Text style={styles.menuItem}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuItemClick('AboutUs')}>
          <Text style={styles.menuItem}>AboutUs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuItemClick('SignIn')}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={handleMenuToggle}
        >
          <AntDesign name="menu-unfold" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.blurtText}>Blurt</Text>
      </View>
      
      {renderMenu()}

      <TextInput
        style={styles.input}
        placeholder="Type your blurt here..."
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleBlurtSubmit}
          style={styles.blurtButton}
        >
          Blurrt!
        </Button>
        <Button
          mode="contained"
          onPress={handleClearAll}
          style={styles.clearAllButton}
        >
          Clear All
        </Button>
      </View>

      {blurts.map((blurt, index) => (
        <Text key={index} style={styles.blurtItem}>
          {blurt}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    backgroundColor: '#1A8515',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 35,
    width: '100%',
    zIndex: 999,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  menuIconContainer: {
    marginRight: 10,
    marginTop: 20,
  },
  menu: {
    position: 'absolute',
    top: 85,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'white'
  },
  menuItem: {
    fontSize: 20,
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#1A8515',
    color: 'white',
  },
  blurtText: {
    color: 'white',
    fontSize: 20,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blurtButton: {
    backgroundColor: '#1A8515',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  clearAllButton: {
    backgroundColor: 'red',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  blurtItem: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default BlurtScreen;
