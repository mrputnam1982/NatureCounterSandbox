import { combineReducers } from 'redux-immutable';
//import { firebaseReducer } from "react-redux-firebase";
import { user, UserDetail, UserActivity } from "./userReducer";
import Articles from './articleReducer';
import Benefits from './benefitReducer';
import UserGoal from './goalReducer';
import Symptoms from './symptomReducer';
import JournalEntries from './journalEntryReducer';
import snackbar from './snackbarReducer';
import Reports from './reportReducer';
import UserProfile from './userProfileReducer';
//import user from './userReducer';

const rootReducer = combineReducers({
    user,
    snackbar,
    UserDetails: UserDetail,
    UserProfiles: UserProfile,
    ArticleData: Articles,
    BenefitData: Benefits,
    SymptomData: Symptoms,
    JournalEntryData: JournalEntries,
    UserGoals: UserGoal,
    Report: Reports
});

export default rootReducer;