import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PomodoroScreen = () => {
  const [time, setTime] = useState('25:00');
  const [isActive, setIsActive] = useState(false);
  const [workTime, setWorkTime] = useState(25 * 60);
  const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(15 * 60);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (workTime > 0) {
          setWorkTime(prevTime => prevTime - 1);
          setTime(formatTime(workTime - 1));
        } else {
          setIsActive(false);
          clearInterval(interval);
          // Handle timer completion here
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, workTime]);

  const start = (duration) => {
    setIsActive(true);
    setWorkTime(duration);
    setTime(formatTime(duration));
  };

  const reset = () => {
    setIsActive(false);
    setWorkTime(25 * 60); 
    setTime(formatTime(25 * 60));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

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
        <TouchableOpacity onPress={() => handleMenuItemClick('Blurt')}>
          <Text style={styles.menuItem}>Blurt</Text>
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
        <Text style={styles.pomodoroText}>Pomodoro</Text>
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.time}>{time}</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => start(workTime)}>
          <Text style={styles.buttonText}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortBreakButton}
          onPress={() => start(shortBreakTime)}
        >
          <Text style={styles.buttonText}>Short Break</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.longBreakButton}
          onPress={() => start(longBreakTime)}
        >
          <Text style={styles.buttonText}>Long Break</Text>
        </TouchableOpacity>
      </View>
      {renderMenu()}
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
  pomodoroText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    marginTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
    color: 'white',
  },
  startButton: {
    backgroundColor: '#1A8515',
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#FF0000',
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
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
    borderColor: 'white',
  },
  menuItem: {
    fontSize: 20,
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#1A8515',
    color: 'white',
  },
  shortBreakButton: {
    backgroundColor: '#1A8515',
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  longBreakButton: {
    backgroundColor: '#FFA500',
    alignItems: 'center',
    padding: 10,
    width: 150,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default PomodoroScreen;
