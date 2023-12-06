import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Image, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AboutUs = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const teamMembers = [
    { name: "Layson, Sebastian Carlo ", image: require("../assets/layson.png") },
    { name: "Ausan, Reizen Kim", image: require("../assets/ausan.png") },
    { name: "Pineda, Julian Andre", image: require("../assets/pineda.png") },
    { name: "Penaverde, Carlo Jr.", image: require("../assets/penaverde.png") },
  ];

const handleMenuItemClick = (menuItem) => {
  setIsMenuOpen(false);
  navigation.navigate(menuItem);
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
      <TouchableOpacity onPress={() => handleMenuItemClick('Blurt')}>
        <Text style={styles.menuItem}>Blurt</Text>
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
        onPress={() => setIsMenuOpen(!isMenuOpen)}
      >
        <AntDesign name="menu-unfold" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.AboutusText}>About Us</Text>
    </View>
    <View style={styles.teamContainer}>
      {teamMembers.map((member, index) => (
        <View key={index} style={styles.member}>
          <Image style={styles.Pics} source={member.image} />
          <Text style={styles.names}>{member.name}</Text>
        </View>
      ))}
      <Text style={styles.contact}>{'Contact Us On:\nEmail: qscenmlayson@tip.edu.ph \nContact No: 0966-901-8133'}</Text>
    </View>
    {isMenuOpen && renderMenu()}
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
  AboutusText: {
    color: 'white',
    fontSize: 20,
    marginTop: 12,
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  member: {
    alignItems: "center",
    marginBottom: 20,
  },
  Pics: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderRadius: 200,
  },
  names: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 16,
    color: 'white',
    textAlign: "center",
    maxWidth: 120,
  },
  contact:{
    textAlign:'center',
    color: 'white',

  }
  
});



export default AboutUs;