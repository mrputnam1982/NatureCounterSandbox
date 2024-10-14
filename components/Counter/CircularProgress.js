import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import Animated, { interpolate, multiply, lessThan } from "react-native-reanimated";
import HalfCircle from "./HalfCircle";
import { PI, RADIUS } from "../Utilities/Constants";
// import { transformOrigin } from 'react-native-redash/src/v1';
import Svg, { Circle, Path } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';

  const marginTopModifier = Platform.OS === 'android' ? 0.09 : 0.06;

  const StyledView = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: ${() => Dimensions.get('window').height * marginTopModifier}px;
  `;

const CircularProgress = ({ percentElapsed, bg, fg }: CircularProgressProps) => {
  // const radius = 40;
  const radius = Platform.OS === 'android' ? 40 : 47;
  const arcLength = Math.round(2 * PI * radius);

  const getSpacing = () => {
      return `${Math.trunc(0.01 * percentElapsed * arcLength)} ${Math.trunc(0.01 * (100 - percentElapsed) * arcLength)}`;
  }

  return (
      <>
      <StyledView>
        <Svg height={Math.trunc(Dimensions.get('window').height * 0.4)} width="100%" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="48"
            r={radius}
            stroke="#DCEFE0"
            strokeWidth="5"
          />
          <Circle
            cx="50"
            cy="48"
            r={radius}
            stroke="#459F5E"
            strokeWidth="5"
            strokeDasharray={getSpacing()}
            strokeLinecap="round"
            transform="rotate(270, 50, 48)"
          />
        </Svg>
      </StyledView>
      </>
  );
}

export default CircularProgress;
