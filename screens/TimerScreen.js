import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Button, Portal } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const TimerScreen = ({ navigation }) => {
  const [initialHours, setInitialHours] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSetTimeModalVisible, setIsSetTimeModalVisible] = useState(false);

  // Add a ref to track whether the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    let interval;
    if (isRunning && (hoursLeft > 0 || minutesLeft > 0 || secondsLeft > 0)) {
      interval = setInterval(() => {
        if (secondsLeft === 0) {
          if (minutesLeft === 0) {
            if (hoursLeft === 0) {
              setIsRunning(false);
              clearInterval(interval);
              return;
            }
            setHoursLeft((prevHours) => prevHours - 1);
            setMinutesLeft(59);
            setSecondsLeft(59);
          } else {
            setMinutesLeft((prevMinutes) => prevMinutes - 1);
            setSecondsLeft(59);
          }
        } else {
          setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else if (hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, hoursLeft, minutesLeft, secondsLeft]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHoursLeft(0);
    setMinutesLeft(0);
    setSecondsLeft(0);
  };

  const setCustomTime = () => {
    setIsSetTimeModalVisible(true);
  };

  const handleSetTime = () => {
    setHoursLeft(initialHours);
    setMinutesLeft(initialMinutes);
    setSecondsLeft(initialSeconds);
    setIsSetTimeModalVisible(false);
  };

  const addMinutes = (minutesToAdd) => {
    setMinutesLeft((prevMinutes) => prevMinutes + minutesToAdd);
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
        <TouchableOpacity onPress={() => handleMenuItemClick('Pomodoro')}>
          <Text style={styles.menuItem}>Pomodoro</Text>
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
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={handleMenuToggle}
        >
          <AntDesign name="menu-unfold" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.timerText}>Timer</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.topButtons}>
          <Button mode="contained" style={styles.startButton} onPress={startPauseTimer}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button mode="contained" style={styles.resetButton} onPress={resetTimer}>
            Reset
          </Button>
        </View>
        <Text style={styles.timer}>
          {String(hoursLeft).padStart(2, '0')}:{String(minutesLeft).padStart(2, '0')}:{String(secondsLeft).padStart(2, '0')}
        </Text>
        <View style={styles.bottomButtons}>
          <Button mode="contained" style={styles.setButton} onPress={setCustomTime}>
            Set Time
          </Button>
        </View>
        <View style={styles.bottomButtons}>
          <Button mode="contained" style={styles.addButton} onPress={() => addMinutes(5)}>
            Add 5 Minutes
          </Button>
        </View>
        <View style={styles.bottomButtons}>
          <Button mode="contained" style={styles.addButton} onPress={() => addMinutes(10)}>
            Add 10 Minutes
          </Button>
        </View>
      </View>

      <Portal>
        <Modal
          visible={isSetTimeModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsSetTimeModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Set Custom Time</Text>
              <TextInput
                style={styles.input}
                placeholder="Hours"
                onChangeText={(text) => setInitialHours(parseInt(text))}
              />
              <TextInput
                style={styles.input}
                placeholder="Minutes"
                onChangeText={(text) => setInitialMinutes(parseInt(text))}
              />
              <TextInput
                style={styles.input}
                placeholder="Seconds"
                onChangeText={(text) => setInitialSeconds(parseInt(text))}
              />
              <View style={styles.modalButtons}>
                <Button mode="contained" style={styles.modalButton} onPress={handleSetTime}>
                  Set
                </Button>
                <Button mode="contained" style={styles.modalButton} onPress={() => setIsSetTimeModalVisible(false)}>
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
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
  menuIconContainer: {
    marginRight: 10,
    marginTop: 12,
  },
  timerText: {
    fontSize: 20,
    color: 'white',
    marginTop: 12,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 80,
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
  },
  topButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  startButton: {
    backgroundColor: 'green',
    marginRight: 10,
    marginTop: 50,
    marginBottom: 20,

  },
  resetButton: {
    backgroundColor: 'red',
    marginTop: 50,
    marginBottom: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  setButton: {
    backgroundColor: 'blue',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'orange',
    marginRight: 10,
  },
  menu: {
    position: 'absolute',
    top: 85, // Adjust according to your header's height
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000, // Make sure this is above all other content
    elevation: 5, // For Android shadow
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    width: '45%',
    backgroundColor: 'green',
  },
});

export default TimerScreen;
