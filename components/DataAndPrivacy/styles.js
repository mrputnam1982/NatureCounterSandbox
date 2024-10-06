import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    exitBtn: {
      position: 'absolute',
      right: '3%',
      padding: 10,
    },
    container: {
      position: 'absolute',
      top: '25%',
      left: '10%',
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      elevation: 5,
      padding: 15,
      margin: 0,
      alignItems: 'center',
    },
    scrollContainer: {
      margin: 10,
      marginBottom: 30,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 20,
    },
    btnContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
  });