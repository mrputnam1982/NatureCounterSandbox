import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import AchievementsSection from '../../components/Section/AchievementsSection';
import BenefitsGainedSection from '../../components/Section/BenefitsGainedSection';
import DurationHighlightsChart from '../../components/Charts/DurationHighlightsChart';
import ShareIcon from '../../assets/icons/Share.svg';
import {useNavigation} from '@react-navigation/native';
import Tips from '../../components/Section/Tips';
import styles from '../../components/Section/styles';
import { fetchWeeklyReport, fetchMonthlyReport, fetchYearlyReport } from '../../redux/actions/reportActions';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from '../../components/Selector/DatePicker';
import useAddBackButton from "../../components/Utilities/useAddBackButton";

const ReportScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useAddBackButton(navigation, true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let reports = useSelector(
    state => state.getIn(['Report'])
  );
  
  useEffect(() => {
    dispatch(fetchWeeklyReport(selectedDate));
    dispatch(fetchMonthlyReport(selectedDate));
    dispatch(fetchYearlyReport(selectedDate));
  }, [selectedDate]);

  return(
    (reports.date != null && reports.weekly.length != 0 && reports.monthly.length != 0 && reports.yearly.length != 0 &&
      <ScrollView style = {styles.Reports}>
        <View style={{flexDirection: 'row', marginVertical:20, justifyContent:'center'}}>
          <DatePicker callback = {setSelectedDate}/>
          <View style={{justifyContent:'center', marginLeft: 280}}>
            <ShareIcon
              width="30"
              height="30"
              onPress={() => navigation.navigate('ReportDownloadScreen')}
            />
          </View>
        </View>
        <AchievementsSection data = {reports}/>
        <BenefitsGainedSection />
        <DurationHighlightsChart data = {reports} />
        <Tips />
        {/* <Image style={{alignSelf:'center',alignItems:'center',justifyContent:'center'}} source={require('../../assets/Frame26.png')}/>  */}

      </ScrollView>
    )
  );
  
};

export default ReportScreen;
