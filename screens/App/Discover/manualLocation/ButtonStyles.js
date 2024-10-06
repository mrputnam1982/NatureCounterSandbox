import { StyleSheet } from 'react-native';
import { THEME_DARK_GREEN, THEME_GREEN } from '../../../../components/Utilities/Constants';

const ButtonStyles = StyleSheet.create({
  blockedButton: {
    height: 50,
    width: 200,
    backgroundColor: "white",
    borderColor: THEME_GREEN,
    borderWidth: 1,
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
  button: {
    height: 50,
    width: 200,
    backgroundColor: THEME_GREEN,
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
  blockedLabel: {
    color: THEME_GREEN,
    fontWeight: '400',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default ButtonStyles;
