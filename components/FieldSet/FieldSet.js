import React from 'react';
import {DefaultTheme} from '@react-navigation/native';
import styled from 'styled-components';

const Border = styled.View`
  padding-vertical: 10px;
  padding-horizontal: 15px;
  border-width: 1px;
  border-radius: 4px;
  border-color: #a4a9ae;
  margin-bottom: 20px;
`;

const Legend = styled.Text`
  position: absolute;
  top: -10px;
  left: 10px;
  padding-horizontal: 5px;
  font-weight: bold;
  color: #707070;
  background-color: ${DefaultTheme.colors.background};
`;

const FieldSet = ({legend, children}) => (
  <Border>
    <Legend>{legend}</Legend>
    {children}
  </Border>
);

export default FieldSet;
