import React from 'react';
import styled from 'styled-components/native';
import Spinner from 'react-native-spinkit';
import { colors } from '../../Data/constants';

export default ({ size = 20, color = colors.primaryLight, background, topMargin = 0, style }) => (
  <Container background={background} topMargin={topMargin} style={style}>
    <Spinner type="Bounce" size={size} isVisible={true} color={color} />
  </Container>
);

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-top: ${props => props.topMargin || 0};
`;
