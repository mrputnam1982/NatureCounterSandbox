import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { createToken } from '../actions/createToken';
import baseUrl from '../../helpers/baseUrl';
import auth from '@react-native-firebase/auth';


const findLastDate = (month, year) => {
        let lastDate = 31;
        while(new Date(year, month, lastDate).getMonth() != month) lastDate--;
        return lastDate;
}

/**
 * 
 * @param {Date} currentDate 
 * @returns 
 */
export function fetchWeeklyReport(currentDate) {
        return async function action(dispatch) {
            const header = await createToken();
            const { uid } = auth().currentUser;
	        const dayOfWeek = currentDate.getDay();
            const date = currentDate.getDate();
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            const firstDateOfWeek = new Date(year, month, date-dayOfWeek+1);
            console.log("firstDate: ",firstDateOfWeek);
            let report = [];
            for(let i = 0; i < 7; i++){
                const currentDate = new Date(firstDateOfWeek.getFullYear(), firstDateOfWeek.getMonth(), firstDateOfWeek.getDate()+i);
                const startTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
                const endTime = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
                await axios.post(`${baseUrl}journal/date?uid=${uid}`,
                    {start_time: startTime, end_time:endTime}, header
                    ).then(
                        (response) => {
                            // console.log(response.data);
                            report.push(response.data.length == 0 ? 0 : response.data[0].totalMin/60);
                        }
                    ).catch((error) => {
                        console.log('', error.message);
                        console.log(startTime +"-----"+endTime);
                });
            }
            // console.log("Weekly: ", report);
            dispatch(updateWeeklyReports(firstDateOfWeek, report));
	}
}

export function fetchMonthlyReport(currentDate) {
	return async function action(dispatch) {
                const header = await createToken();
                const { uid } = auth().currentUser;
                let date = 1;
                const month = currentDate.getMonth();
                const year = currentDate.getFullYear();
                let report = [];
                while(new Date(year, month, date).getMonth() == month){
                    const startTime = `${year}-${month+1}-${date}`;
                    const endTime = `${year}-${month+1}-${date}`;
                    // console.log(startTime +"----"+ endTime);
                    await axios.post(`${baseUrl}journal/date?uid=${uid}`,
                            {start_time: startTime, end_time:endTime}, header
                        )
                        .then(
                            (response) => {
                                // console.log(response.data);
                                report.push(response.data.length == 0 ? 0 : response.data[0].totalMin/60);
                            }
                        )
                        .catch((error) => {
                            console.log('', error.message);
                            console.log(startTime +"-----"+endTime);
                        });
                    date++;
                }
                // console.log("Monthly: ", report);
                dispatch(updateMonthlyReports(currentDate, report));
	}
}

export function fetchYearlyReport(currentDate) {
	return async function action(dispatch) {
                const header = await createToken();
                const { uid } = auth().currentUser;
                const year = currentDate.getFullYear();
                let report = [];
                for(let month = 0; month < 12; month++){
                    const startTime = `${year}-${month+1}-${1}`;
                    const endTime = `${year}-${month+1}-${findLastDate(month, year)}`;
                    // console.log(startTime +"----"+ endTime);
                    await axios.post(`${baseUrl}journal/date?uid=${uid}`,
                            {start_time: startTime, end_time:endTime}, header
                        )
                        .then(
                            (response) => {
                                // console.log(response.data);
                                report.push(response.data.length == 0 ? 0 : response.data[0].totalMin/60);
                            }
                        )
                        .catch((error) => {
                            console.log('', error.message);
                            console.log(startTime +"-----"+endTime);
                        });
                }
                // console.log("Yearly: ", report);
                dispatch(updateYearlyReports(currentDate, report));
	}
}

export const updateWeeklyReports = (startDate, report) => ({
	type: ActionTypes.UPDATE_WEEKLY_REPORT,
	payload:{
        startDate: startDate,
        data: report
    }
});

export const updateMonthlyReports = (startDate, report) => ({
	type: ActionTypes.UPDATE_MONTHLY_REPORT,
	payload:{
        startDate: startDate,
        data: report
    }
});

export const updateYearlyReports = (startDate, report) => ({
	type: ActionTypes.UPDATE_YEARLY_REPORT,
	payload:{
        startDate: startDate,
        data: report
    }
});
