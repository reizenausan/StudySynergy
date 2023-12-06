import { StyleSheet } from 'react-native';

const DashboardStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    topBar: {
      backgroundColor: '#91CD87',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 55,
    },
    hamburgerIcon: {
      position: 'absolute',
      top: 40,
      left: 20,
    },
    initialContainer: {
      position: 'absolute',
      top: 30,
      right: 20,
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#91CD87',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: '#45853B',
    },
    initialText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    welcomeContainer: {
      flex: 1,
      marginTop: 10,
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '100%',
    },
    inputField: {
      height: 40,
      paddingRight: 10,
      color: 'grey',
      flex: 1,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    addButton: {
      backgroundColor: '#91CD87',
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: 'black',
    },
    line: {
      width: '100%',
      height: 3,
      backgroundColor: '#91CD87',
      marginTop: 5,
    },
    goalsContainer: {
      flex: 1,
      margin: 0,
      width: '100%',
    },
    goalItem: {
      backgroundColor: '#A5D7A7',
      padding: 10,
      margin: 5,
      borderRadius: 20,
    },
    goalText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    trashIcon: {
      position: 'absolute',
      top: 8,
      right: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'black',
      borderRadius: 10,
      padding: 20,
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      padding: 10,
      margin: 5,
      backgroundColor: '#91CD87',
      borderRadius: 5,
      alignItems: 'center',
    },
    modalButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
  });

export default DashboardStyle;