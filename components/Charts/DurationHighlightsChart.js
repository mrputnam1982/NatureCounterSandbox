import React, {UseState, useEffect} from 'react';
import { View, Text, Button, NativeBaseProvider } from 'native-base';
import {Image} from 'react-native'
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from 'victory-native';
import { green } from 'react-native-redash';
import WeekSelector from '../../components/Selector/WeekSelector';
import WeekButtongroup from '../../components/Selector/weekButtonGroup';
import Data from '../../SampleData/Data1'
import styles from '../Section/styles';
import OverviewSection from '../Section/OverviewSection'
import DatePicker from '../../components/Selector/DatePicker';
import SectionHeaderRow from '../Row/SectionHeaderRow';
import DurationHighlightsLogo from '../../assets/icons/Highlights.svg'

function DurationHighlightsChart ({data})  {

    console.log("Chart Data: ",data);
    function updateCurrentInMinutes(index){
        if(index==0){
            var total = 0;
             //total up weekly hours
            data.weekly.forEach(mins=>{
                total+=mins;
            })
            setCurrentMinutes(total)
            //update goal to be weekly
            setCurrentGoal(120);
            const endDate = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate()+6);
            setDateRange(`${data.date.getMonth()+1}/${data.date.getDate()}/${data.date.getFullYear()} - ${endDate.getMonth()+1}/${endDate.getDate()}/${endDate.getFullYear()}`);
        }else if(index==1){
            var total = 0;
            //total up monthly hours
            data.monthly.forEach(mins => {
                total+=mins;
            });
             //set monthly hours to display on screen
            setCurrentMinutes(total)
            //update goal to be monthly
            setCurrentGoal(120);
            setDateRange(`${data.date.getMonth()+1}/1/${data.date.getFullYear()} - ${data.date.getMonth()+1}/${data.monthly.length}/${data.date.getFullYear()}`);
        }else if(index==2){
            var total = 0;
            //total up yearly hours
            data.yearly.forEach(mins => {
                total+=mins;
            });
            //set annual hours to display on screen
            setCurrentMinutes(total)
            //update goal to be annually
            setCurrentGoal(120);
            setDateRange(`1/1/${data.date.getFullYear()} - 12/31/${data.date.getFullYear()}`);
        }
    }

    //date range index represents the "mode" we are in, weekly=0, monthly=1 or annual=2
    const [dateRangeIndex, getDateRangeIndex] = React.useState(1);
        //use effect gets called every time our date range index gets updated
    useEffect(() => {
        updateCurrentInMinutes(dateRangeIndex);
      }, [dateRangeIndex, data.date]); 


    const [goalInMinutes, setCurrentGoal] = React.useState(120);

    const [dateRange, setDateRange] = React.useState(null);
    
    const [currentMinutesInRange, setCurrentMinutes] = React.useState(45);


    return <NativeBaseProvider>
    <View style = {styles.backgroundColor}>
        
        <View style={[ styles.container,{ flexDirection: 'row',}, ]}>
            <DurationHighlightsLogo></DurationHighlightsLogo>
            <SectionHeaderRow title="Duration Highlights" />
        </View>
        {/*set the callbacks in our date picker and week selector ui elements*/}
        {/* <DatePicker callback = {setDateRange} dateMode = {parseInt(dateRangeIndex)}/> */}
        <WeekButtongroup callback = {getDateRangeIndex}/>
        <View elevation={5} style={styles.graphContainer}>
            <Text style={styles.dateRange}>{dateRange}</Text>
            <OverviewSection goalInMinutes = {goalInMinutes} currentInMinutes = {currentMinutesInRange} />
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                <VictoryGroup offset = {50}>
                    <VictoryBar 
                        data = {dateRangeIndex===0?data.weekly:dateRangeIndex===1?data.monthly:data.yearly}
                        style = {{
                            data:{
                                fill:'#459F5E',
                                color: '#94D39E',
                                backgroundColor: '#FFFFFF',
                            },
                            }}
                    />
                </VictoryGroup>
            </VictoryChart>
        </View> 
       
    </View>
    
</NativeBaseProvider>
};

export default DurationHighlightsChart;