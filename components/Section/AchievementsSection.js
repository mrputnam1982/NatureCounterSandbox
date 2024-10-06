import React, {usestate} from 'react';
import SectionHeaderRow from '../Row/SectionHeaderRow';
import Badge from '../Badges/Badge';
import VisitsBadge from '../Badges/VisitsBadge';
import GoldBadge from '../Badges/GoldBadge';
import SilverBadge from '../Badges/SilverBadge';
import BronzeBadge from '../Badges/BronzeBadge';
import PlatinumBadge from '../Badges/PlatinumBadge';
import LevelBadge from '../Badges/LevelBadge';
import Trophy from '../../assets/icons/Trophy.svg';
import {
  Image,
  View,
  ScrollView,
  Text,
  Button,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import data from '../../SampleData/data.json';

const AchievementsSection = ({data}) => {
  let mins = 0;
  for(let i = 0; i < data.weekly.length; i++){
    mins += data.weekly[i];
  }
  return (
    <>
      <View style={[ styles.container,{ flexDirection: 'row',}, ]}>
    
      <Trophy></Trophy>
      <SectionHeaderRow title="Achievements" />
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.evenRow}>
          {/*<LevelBadge />*/}
          <Badge mins = {mins} />
          <VisitsBadge />
          {mins >= 120 ? <GoldBadge /> : null}
          {mins >= 90 ? <SilverBadge /> : null}
          {mins >= 60 ? <BronzeBadge /> : null}
          {mins >= 30 ? <PlatinumBadge /> : null}
        </View>
      </ScrollView>
    </>
  );
};
export default AchievementsSection;
