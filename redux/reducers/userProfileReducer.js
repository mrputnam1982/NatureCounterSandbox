import * as ActionTypes from '../actions/ActionTypes';

const UserProfile = (state = {
	isLoading: true,
	errmsg: null,
	userProfile: []
}, action) => {
    Object.assign(state, state.data);
	switch (action.type) {
		case ActionTypes.USER_PROFILE_LOADING:
            // console.log("JournalEntries state still loading...");
			return ({ ...state, isLoading: true, errmsg: null, userProfile: [] });

		case ActionTypes.USER_PROFILE_FAILED:
			return ({ ...state, isLoading: false, errmsg: action.payload, userProfile: [] });

		case ActionTypes.GET_USER_PROFILE:
			return ({ ...state, isLoading: false, errmsg: null, userProfile: action.payload
			 });
   
		default:
			return state;
	}
}

export default UserProfile;