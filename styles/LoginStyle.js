import { StyleSheet } from 'react-native';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set the background color to transparent
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 5,
  },
  appName: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#003900', // Background color for the buttons
    padding: 10,
    borderRadius: 5,
    marginTop: 35,
    marginBottom: 15,
    width: '50%'
  },
  button1: {
    backgroundColor: '#91CD87', // Background color for the buttons
    padding: 10,
    borderRadius: 5,
    width: '50%'
  },
  buttonText: {
    color: '#17b04a',
    textAlign: 'center',
    fontSize: 18,

  },
  buttonText1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,

  },
});

export default LoginStyle;
