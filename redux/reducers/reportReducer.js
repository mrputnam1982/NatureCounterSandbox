import * as ActionTypes from '../actions/ActionTypes';


const Reports = (state = {
    date: null,
    weekly: [],
    monthly: [],
    yearly: []
}, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_WEEKLY_REPORT:
            if(action.payload.startDate == state.date && state.weekly.length != 0){
                return state;
            }else{
                return ({ ...state, date: action.payload.startDate, weekly: action.payload.data });

            }
        case ActionTypes.UPDATE_MONTHLY_REPORT:
            if(action.payload.startDate.getMonth() == state.date?.getMonth() && state.monthly.length != 0){
                return state;
            }else{
                return ({ ...state, date: action.payload.startDate, monthly: action.payload.data });
            }
        case ActionTypes.UPDATE_YEARLY_REPORT:
            if(action.payload.startDate.getFullYear() == state.date?.getFullYear() && state.yearly.length != 0){
                return state;
            }else{
                return ({ ...state, date: action.payload.startDate, yearly: action.payload.data });
            }
        default:
            return state;
	}
}

export default Reports;