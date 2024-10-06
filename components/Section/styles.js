import {StyleSheet} from 'react-native';
import {
  BOULDER_GREY,
  DARK_GREY,
  SAGE_GREEN,
  THEME_EVERGREEN,
} from '../Utilities/Constants';

const styles = StyleSheet.create({
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    width: 375,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flex: 1,
  },

  singleQuestionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    width: 375,
  },

  faqSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginBottom: 12,
    width: 318,
    flex: 0,
  },
  closeIcon: {
    position: 'absolute',
    right: '3%',
    padding: 10,
  },
  faqTitle: {
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 18,
    color: '#1D2023',
    flex: 0,
  },

  faqOuterDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    marginLeft: 'auto',
    width: '90%',
  },

  faqDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    width: '90%',
    margin: 0,
  },

  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    width: 375,
    marginLeft: 32,
    flex: 0,
  },

  faqQuestion: {
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#1D2023',
    width: '100%',
    paddingEnd: 16,
  },

  collapsedQuestion: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 0,
    width: 375,
    flex: 0,
    flexGrow: 0,
    alignSelf: 'auto',
  },

  expandedQuestion: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    width: 375,
    backgroundColor: '#F1FAF3',
    flex: 0,
    flexGrow: 0,
  },

  answer: {
    fontFamily: 'System',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    color: '#1D2023',
    width: '100%',
  },

  expandedAnswer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    flex: 0,
    flexGrow: 0,
    marginVertical: 24,
  },

  expansionButton: {
    width: 24,
    height: 24,
    flex: 0,
  },

  container: {
    marginLeft: 16,
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 15,
  },

  HelpCenterBanner: {
    position: 'absolute',
    width: '100%',
    height: 44,
    backgroundColor: '#DCEFE0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4,
  },

  HelpCenterTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1D2023',
    marginLeft: 15,
    flex: 1,
  },

  helpCenterImage: {
    marginLeft: 125,
    marginTop: 40,
    marginBottom: 32,
  },

  dropdownContainer: {
    width: 370,
    marginLeft: 24,
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'green',
    color: 'green',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
    flex: 0,
    flexGrow: 0,
    marginBottom: 50,
    maxWidth:'90%',
  },

  pickerStyle: {
    backgroundColor: 'white',
    width: 370,
    color: 'black',
    marginLeft:"auto",
    marginRight:"auto",
    maxWidth:'90%',
  },

  contactUsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    margin: 24,
    width: 375,
  },

  contactUsSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    margin: 8,
    width: 375,
  },

  contactUs: {
    width: 100,
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 18,
    color: '#1D2023',
    flex: 1,
    flexGrow: 1,
  },

  topicContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    marginLeft: 24,
    width: 375,
    flex: 1,
    flexGrow: 1,
  },

  topicSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    width: 375,
    height: 18,
    flex: 1,
    flexGrow: 1,
  },

  topicQuestion: {
    width: 375,
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 18,
    color: '#707070',
  },

  emailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    marginLeft: 24,
    marginTop: 32,
    width: 370,
    flex: 1,
    flexGrow: 1,
    marginBottom:32,
    maxWidth:'90%',
  },

  contactEmailSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 375,
    padding: 0,
    flex: 1,
    flexGrow: 0,
    marginBottom: 16,
  },

  contactEmailText: {
    width: 375,
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 18,
    color: '#707070',
  },

  emailInputBox: {
    width: 327,
    height: 56,
    marginLeft: 24,
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#1D2023',
    flex: 1,
    flexGrow: 1,
  },

  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    margin: 24,
    width: 375,
    flex: 1,
    flexGrow: 1,
  },

  messageSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 375,
    marginBottom: 16,
    flex: 1,
    flexGrow: 1,
  },

  message: {
    width: 375,
    fontFamily: 'System',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 18,
    color: '#707070',
  },
  textBox: {
    width: 327,
    height: 240,
    textAlignVertical: 'top',
    margin: 24,
    flex: 1,
    flexGrow: 1,
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#1D2023',
  },

  button: {
    backgroundColor: '#459F5E',
    height: 48,
    width: 231,
    left: 72,
    top: 16,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    paddingTop: 10,
    paddingRight: 56,
    paddingBottom: 10,
    paddingLeft: 56,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  key: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 16,
  },
  modalBold: {
    fontWeight: '700',
    fontSize: 21,
  },
  modalContainer: {
    paddingHorizontal: 12,
  },
  modalText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 15,
  },
  modalImage: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 16,
  },
  buttonModal: {
    borderRadius: 30,
    marginLeft: 213,
    width: 83,
    height: 40,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#459F5E',
  },
  buttonTextModal: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  quickLinksContainer: {
    width: 370,
    height: 178,
    backgroundColor: SAGE_GREEN,
  },
  dateView: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginLeft: 16,
  },
  locationView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: BOULDER_GREY,
    marginHorizontal: 30,
  },
  parkView: {
    height: 80,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  parkSetView: {
    flexDirection: 'row',
  },
  parkNameFont: {
    fontSize: 15,
    color: 'black',
    marginLeft: 16,
  },
  parkAddressFont: {
    fontSize: 15,
    color: BOULDER_GREY,
    marginLeft: 16,
  },
  parkDistanceFont: {
    fontSize: 13,
    color: BOULDER_GREY,
    marginLeft: 16,
  },
  favoritView: {
    right: 0,
  },
  timeView: {
    height: 180,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timerView: {
    height: 18,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  counterView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterFont: {
    fontSize: 16,
    color: THEME_EVERGREEN,
    alignItems: 'center',
  },
  ParseTimeView: {
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeFont: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  percentView: {
    height: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonView: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentFont: {
    fontSize: 16,
    color: THEME_EVERGREEN,
    alignItems: 'center',
  },
  limitFont: {
    fontSize: 16,
    color: BOULDER_GREY,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },

  SectionHeaderTitle: {
    fontSize: 16,
  },

  HeaderImage: {},
  evenRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 16,
  },
  badge: {
    width: 120,
    height: 120,
  },
  overviewContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  graphContainer: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderColor: 'rgb(100, 100, 100)',
    borderWidth: 1,
    borderRadius: 5,
  },
  datePicker: {
    margin: 2,
    backgroundColor: 'rgb(100, 300, 100)',
    borderStyle: 'solid',
    borderColor: 'rgb(100, 100, 100)',
    borderWidth: 1,

    borderRadius: 5,
  },
  dateRange: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 2,
    paddingBottom: 5,
  },
  tipsContainer: {
    backgroundColor: '#3A375F',
    color: 'rgb(0, 204, 102)',
    padding: 10,
    borderRadius: 13,
    marginLeft: 16,
    marginRight: 16,
  },
  tipsText: {
    margin: 10,
    color: '#FFFFFF',
    padding: 5,
    fontSize: 15,
  },
  tipImage: {
    marginLeft: '68%',
  },
  text: {
    color: '#94D39E',
    fontSize: 20,
  },
  Reports: {
    backgroundColor: '#FFFFFF',
  },
  divider: {
    backgroundColor: '#E7E7E7',
    margin: 0,
    borderWidth: 0.2
  },
});

export default styles;
