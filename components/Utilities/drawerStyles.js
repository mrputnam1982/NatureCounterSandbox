import {StyleSheet} from 'react-native';

const drawerStyles = StyleSheet.create({
  label: {
    fontFamily: 'Roboto-Regular',
    color: '#A4A9AE',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    marginLeft: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8,
    marginVertical: 16,
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    color: '#1D2023',
  },
  divider: {
    marginTop: 16,
    width: '100%',
    color: 'grey',
  },
  modalContainer: {
    paddingHorizontal: 12,
  },
  keyWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1FAF3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTextView:{
    width: 264, 
    height: 54, 
    marginBottom: 16
  },
  modalText: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    color: '#1D2023',
  },
  modalLabelView:{
    width: 264, 
    height: 23, 
    marginVertical: 16
  },
  modalLabel: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 21,
    lineHeight: 23.1,
    color: '#1D2023',
  },
  icon: {
    width: 24, 
    height: 24, 
    marginRight: 16
  },
  logoutIcon:{
    alignSelf: 'center', 
    width: 56, 
    height: 56
  }
});

export default drawerStyles;