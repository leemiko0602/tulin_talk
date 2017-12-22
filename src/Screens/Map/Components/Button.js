import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import ThrottleTouchableOpacity from '../../../Components/ThrottleTouchableOpacity';

import { colors } from '../../../Data/constants';

export default ({ title, onPress }) =>
  <Button activeOpacity={1} onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </Button>;

const { width } = Dimensions.get('window');
const Button = styled(ThrottleTouchableOpacity)`
  width: 110;
  height: 40;
  position: absolute;
  bottom: 20;
  left: ${() => (width - 110) / 2};
  background-color: ${colors.secondaryRed};
  border-radius: 20;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  position: absolute;
  background-color: transparent;
  border-radius: 20;
  color: ${colors.primaryLight};
  font-size: 15;
  font-weight: bold;
`;
