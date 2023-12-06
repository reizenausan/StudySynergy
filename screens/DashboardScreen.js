import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Provider as PaperProvider, Button, IconButton, Dialog, Portal } from 'react-native-paper';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc, setDoc, getDocs, query, where, deleteDoc, orderBy } from 'firebase/firestore';

const DashboardScreen = ({ navigation }) => {
  const [userNickname, setUserNickname] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editGoalId, setEditGoalId] = useState('');
  const [editedGoalText, setEditedGoalText] = useState('');
  const [isBlurEffect, setIsBlurEffect] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add a ref to track whether the component is mounted
  const isMounted = useRef(true);

  const toggleBlurEffect = () => {
    setIsBlurEffect(!isBlurEffect);
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const user = auth.currentUser;

      if (user && isMounted.current) {
        try {
          const usersCollection = collection(db, 'users');
          const userDocRef = doc(usersCollection, user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserNickname(userData.nickname);
          }

          const goalsCollection = collection(db, 'goals');
          const userGoalsQuery = query(
            goalsCollection,
            where('userId', '==', user.uid),
            orderBy('sequence') // Order by sequence
          );

          const querySnapshot = await getDocs(userGoalsQuery);
          const goalsData = [];

          querySnapshot.forEach((doc) => {
            goalsData.push({ id: doc.id, text: doc.data().text, sequence: doc.data().sequence });
          });

          if (isMounted.current) {
            setGoals(goalsData);
          }
        } catch (error) {
          console.error('Error fetching user data/goals:', error);
        }
      } else {
        if (isMounted.current) {
          navigation.navigate('SignIn');
        }
      }
    };

    checkUserAuthentication();

    return () => {
      isMounted.current = false;
    };
  }, [navigation]);

  const addGoalWithSequence = () => {
    if (newGoal.trim() !== '') {
      if (goals.length < 15) {
        const nextSequence = goals.length > 0
          ? Math.max(...goals.map(goal => goal.sequence)) + 1
          : 1;

        const goalsCollection = collection(db, 'goals');
        const newGoalDoc = doc(goalsCollection);

        setDoc(newGoalDoc, {
          userId: auth.currentUser.uid,
          text: newGoal,
          sequence: nextSequence,
        })
          .then(() => {
            setGoals([...goals, { text: newGoal, id: newGoalDoc.id, sequence: nextSequence }]);
            setNewGoal('');
          })
          .catch((error) => {
            console.error('Error adding goal:', error);
          });
      } else {
        alert('You can only add up to 15 goals.');
      }
    }
  };

  // Function to handle goal deletion
  const handleDeleteGoal = () => {
    // Delete the goal from Firestore
    const goalsCollection = collection(db, 'goals');
    const goalDocRef = doc(goalsCollection, editGoalId);

    deleteDoc(goalDocRef)
      .then(() => {
        // Remove the goal from the 'goals' state
        setGoals(goals.filter((goal) => goal.id !== editGoalId));
        setIsDeleteDialogVisible(false); // Close the delete confirmation dialog
      })
      .catch((error) => {
        console.error('Error deleting goal:', error);
      });
  };

  // Function to handle goal editing
  const handleEditGoal = () => {
    // Ensure you have the correct document reference
    const goalDocRef = doc(db, 'goals', editGoalId);

    setDoc(goalDocRef, {
      text: editedGoalText,
      // Include other fields if necessary, like 'userId' or 'sequence'
    }, { merge: true }) // Use the merge option to update the document
    .then(() => {
      // Update the 'goals' state with the edited goal text
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === editGoalId ? { ...goal, text: editedGoalText } : goal
        )
      );
      setIsEditModalVisible(false); // Close the edit modal
      toggleBlurEffect();
    })
    .catch((error) => {
      console.error('Error editing goal:', error);
    });
  };


  const handleMenuItemClick = (menuItem) => {
    setIsMenuOpen(false);
    navigation.navigate(menuItem);
  };


  const renderMenu = () => {
    <View style={styles.menu}></View>
    if (!isMenuOpen) return null;

    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => handleMenuItemClick('Timer')}>
          <Text style={styles.menuItem}>Timer</Text>
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
    <View style={[styles.container, isBlurEffect && styles.blurEffect]}>
      <View style={[styles.topBar]}>
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={handleMenuToggle}
        >
          <AntDesign name="menu-unfold" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.dashboardText}>Dashboard</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: styles.topBar.padding }}>
        <Text style={styles.welcomeText}>Welcome {userNickname} to your Study Goal!</Text>
      </View>
      <View style={styles.goalContainer}>
        <TextInput
          style={styles.goalInput}
          placeholder="Add a goal"
          placeholderTextColor="white"
          labelStyle={styles.blackButtonText}
          value={newGoal}
          onChangeText={(text) => setNewGoal(text)}
        />
        <Button mode="contained" style={styles.greenButton} onPress={addGoalWithSequence}>
          Add Goal
        </Button>
        <View style={styles.goals}>
          <Text style={styles.goalsText}> Goals
          </Text></View>
        
      </View>
      <ScrollView style={styles.goalsList}>
        {goals
          .sort((a, b) => a.sequence - b.sequence) // Sort goals by sequence
          .map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.goalText}>{goal.text}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton
                    icon="pencil"
                    color="white"
                    size={20}
                    onPress={() => {
                      setEditedGoalText(goal.text);
                      setEditGoalId(goal.id);
                      setIsEditModalVisible(true);
                    }}
                  />
                  <IconButton
                    icon="delete"
                    color="white"
                    size={20}
                    onPress={() => {
                      setEditGoalId(goal.id);
                      setIsDeleteDialogVisible(true);
                    }}
                  />
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={isDeleteDialogVisible}
          onDismiss={() => setIsDeleteDialogVisible(false)}
        >
          <Dialog.Title>Delete Goal</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this goal?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleteGoal} color="black">Delete</Button>
            <Button onPress={() => setIsDeleteDialogVisible(false)} color="black">Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* Edit Goal Modal */}
      <Portal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditModalVisible}
          onShow={toggleBlurEffect}
          onRequestClose={() => {
            setIsEditModalVisible(false);
            toggleBlurEffect();
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#1A8515', padding: 20,borderWidth: 1, borderRadius: 20 }}>
              <TextInput
                style={styles.EditgoalInput}
                placeholder="Edit goal"
                placeholderTextColor="black"
                value={editedGoalText}
                onChangeText={(text) => setEditedGoalText(text)}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Button onPress={handleEditGoal} style={styles.greenButton} labelStyle={styles.blackButtonText}>Save</Button>
                <Button onPress={() => {
                  setIsEditModalVisible(false);
                  toggleBlurEffect();
                }} style={styles.greenButton} labelStyle={styles.blackButtonText}>Cancel</Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
      {/* Menu */}
      {renderMenu()}
    </View>
  );
};

const styles = {
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
  blackButtonText: {
    color: 'black',
  },
  dashboardText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    marginTop: 20,
  },
  goals:{
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 10, 
    backgroundColor: '#1A8515',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  goalsText:{
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 145
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  goalContainer: {
    paddingHorizontal: 20,
    borderBottomColor: 'white',
    
  },
  goalInput: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    
  },
  goalsList: {
    borderTopColor: '#1A8515',
    borderTopWidth: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#FFFAAB",
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderRightColor: '#1A8515',
    borderLeftColor: '#1A8515',
  },
  goalItem: {
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius:20,
    backgroundColor: "#1A8515",
    marginBottom: 10
  },
  goalText: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 15,
  },
  EditgoalInput: {
    color: 'black',
    borderWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
    padding: 50,
    backgroundColor: "#91CD87",
    
  },
  blurEffect: {
    opacity: 0.7,
  },
  greenButton: {
    backgroundColor: 'green',
  },
  menuIconContainer: {
    marginRight: 10,
    marginTop: 20,
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
};

export default DashboardScreen;
