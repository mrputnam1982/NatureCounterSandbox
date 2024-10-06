import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, Text, View } from 'react-native';
import styled from 'styled-components/native';
import LEAF_ICON from '../../assets/leaf_icon.png';
import { COLOR_BG, COLOR_FG, DARK_GREY } from '../Utilities/Constants';
import CircularProgress from './CircularProgress';

const Timer = ({elapsedTime, limit}) => {
  const [limitText, setLimitText] = useState('');
  const [percentElapsed, setPercentElapsed] = useState(0);

  const StyledView = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  `;

  const TextView = styled.View`
    justify-content: center;
    align-items: center;
    position: relative;
    top: ${() => Math.round(Dimensions.get('window').height) * -0.25}px;
    left: 0px;
    z-index: 1;
  `;
//border-radius modifier 0.3
//width modifier 0.40
//height modifier 0.40
  const dimensionModifier = Platform.OS === 'android' ? 0.40 : 0.35;
  const marginBottomVal = Platform.OS === 'android' ? '0px' : '25px';

  const CounterCap = styled.TouchableHighlight`
    border-radius: ${() => Math.trunc(Dimensions.get('window').height * 0.3)}px;
    width: ${() => Dimensions.get('window').height * dimensionModifier}px;
    height: ${() => Dimensions.get('window').height * dimensionModifier}px;
    background-color: ${COLOR_BG};
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${() => Dimensions.get('window').height * 0.01}px;
    margin-bottom: ${marginBottomVal};
    text-align: center;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  `;

  const TotalTime = styled.Text`
    color: black;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    margin-bottom: -5px;
  `;

  const TimeLimit = styled.Text`
    color: ${DARK_GREY};
    text-align: center;
    font-size: 16px;
  `;

  const PercentContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  `;

  const pad = number => {
    return number < 10 ? '0' + number : number;
  };

  useEffect(() => {
    setLimitText('/ ' + limit + ' min');
  }, [limit]);

  useEffect(() => {
    let percent =
      0.1 *
      Math.trunc(
        (1000 * (elapsedTime % (100 * 1000 * 60 * 60))) / (1000 * 60 * limit),
      );
    setPercentElapsed(percent);
  }, [elapsedTime, limit]);

  const formatTime = time => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    //    console.log('time', time);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <StyledView>
      <CounterCap>
        <View>
          <View style={{position: 'relative', zIndex: -1}}>
            <CircularProgress
              bg={COLOR_BG}
              fg={COLOR_FG}
              {...{percentElapsed}}
            />
          </View>
          <TextView>
            <TotalTime>{formatTime(elapsedTime)}</TotalTime>
            <TimeLimit>{limit && limitText}</TimeLimit>
            <PercentContainer>
              <Image style={{height: 25, width: 20}} source={LEAF_ICON} />
              <Text
                style={{
                  color: '#25BF9D',
                  fontSize: 18,
                  marginLeft: 5,
                }}>
                {percentElapsed.toFixed(1)}%
              </Text>
            </PercentContainer>
          </TextView>
        </View>
      </CounterCap>
    </StyledView>
  );
};

export default Timer;
