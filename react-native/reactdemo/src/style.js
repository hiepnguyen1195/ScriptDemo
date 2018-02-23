import {StyleSheet} from 'react-native'

const styleLogin = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      width: '100%',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 0,
      marginBottom: 20,
    },
    input: {
      width: '90%',
      height: 50,
      borderRadius: 5,
      marginBottom: 20,
      fontSize: 14,
    },
    btnLogin: {
      width: '60%',
      marginTop: 40,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: '#00ace6',
      borderRadius: 5,
    },
    txtButton: {
      color: 'white',
      textAlign: 'center',
    },
});
export default styleLogin