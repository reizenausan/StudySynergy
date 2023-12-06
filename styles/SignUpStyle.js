import { StyleSheet } from 'react-native';

const SignUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 10,
    marginTop: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  logo: {
    width: 250,
    height: 150,
  },
  input: {
    width: '89.5%',
    height: 40,
    backgroundColor: 'black',
    borderColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingLeft: 10,
    marginBottom: 10,
    color: 'white',
    marginLeft: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
    width: '89.5%',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'black',
    color: 'white',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  passwordToggle: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 20, // Adjust the left margin as needed
    marginTop: 5, // Adjust the top margin as needed
  },
  createAccountButton: {
    backgroundColor: '#91CD87',
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  createAccountText: {
    color: 'black',
    fontSize: 18,

  },
  signInText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  signInLink: {
    color: '#91CD87',
    textDecorationLine: 'underline',
  },
});

export default SignUpStyle;
