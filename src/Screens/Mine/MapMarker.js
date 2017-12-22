import React from 'react';
import styled from 'styled-components/native';

import { colors, sizes } from '../../Data/constants';
import assets from './assets';

const MapMarker = ({ city, color, iconSize = 15, fontSize = 'fontSmall', height = '10%' }) => (
  <Wrapper height={height}>
    <Marker size={iconSize} source={assets.mapMarker} resizeMode="contain" />
    <Location size={fontSize} color={color}>{city}</Location>
  </Wrapper>
);

module.exports = MapMarker;

const Wrapper = styled.View`
  width: 100%;
  height: ${props => props.height};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Marker = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: transparent;
`;

const Location = styled.Text`
  font-size: ${props => (props.size ? sizes[props.size] : sizes.fontSmall)};
  padding-left: 5;
  color: ${props => props.color || colors.primaryLight};
`;