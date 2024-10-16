// import {Right} from 'native-base';
import {StyleSheet} from 'react-native';
import {
  THEME_DARK_GREEN,
  THEME_EVERGREEN,
  THEME_GREEN,
} from '../Utilities/Constants';

const styles = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 50,
    width: 50,
    tintColor: '#414959',
  },
  signUpNowPromptContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 12,
  },
  dontHaveAccountLabel: {
    color: 'rgba(0,0,0,0.5)',
    marginRight: 10,
  },

  signUpNowButton: {
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: THEME_GREEN,
    marginHorizontal: 38,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  activeGoalButton: {
    height: 50,
    width: 110,
    backgroundColor: THEME_DARK_GREEN,
    marginHorizontal: 38,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inactiveGoalButton: {
    height: 50,
    width: 110,
    backgroundColor: THEME_GREEN,
    marginHorizontal: 38,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconButton: {
    height: 50,
    width: 70,
    backgroundColor: 'white',
    marginHorizontal: 38,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  white: {
    height: 50,
    width: 90,
    backgroundColor: '#fff',
    marginHorizontal: 38,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    alignSelf: 'center',
  },
  whiteLabel: {
    color: '#000',
    fontWeight: '400',
    fontSize: 16,
    alignSelf: 'center',
  },
  outlineButtonContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginRight: 10,
  },
  outlineButtonLabel: {
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  calendarButton: {
    borderColor: THEME_EVERGREEN,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  calendarButtonLabel: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  calendarIcon: {
    color: '#459F5E',
    marginLeft: 5,
    marginRight: 5,
    height: 18,
    width: 18,
  },
  calendarDate: {
    fontSize: 16,
  },
  addJournalButton: {
    margin: 5,
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
  },
  datePicker: {
    height: '40%',
    backgroundColor: 'white',
    marginVertical: '50%',
    marginHorizontal: 30,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default styles;
