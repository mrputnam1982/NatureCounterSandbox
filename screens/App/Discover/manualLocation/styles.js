import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    exitBtn: {
      position: "absolute",
      right: 16,
      top: 16,
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
      padding: 8,
      margin: 0,
      alignItems: 'center',
    },
    iconContainer: {
      marginTop: 8,
      width: 55,
      height: 55,
    },
    scrollContainer: {
      margin: 10,
      marginBottom: 30,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 16,
    },
    content: {
      fontSize: 14,
      fontFamily: 'System',
    },
    contentBold: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    btnContainer: {      
      flexDirection: 'row',  
      justifyContent: 'flex-end',
      marginTop: 16,
      width: '100%',
    },
  });