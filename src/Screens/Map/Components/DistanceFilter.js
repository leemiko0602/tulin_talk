import React from 'react';
import styled from 'styled-components/native';

import ThrottleTouchableOpacity from '../../../Components/ThrottleTouchableOpacity';

import { colors, sizes, feedbacks } from '../../../Data/constants';

export default ({ options, current, onChoose }) =>
  <Container>
    {options.map(x =>
      <Option key={x.value} activeOpacity={feedbacks.activeOpacity} onPress={() => onChoose(x.value)}>
        <OptionText active={current === x.value}>{x.label}</OptionText>
      </Option>
    )}
  </Container>;

const Container = styled.View`
  height: 100%;
`;

const Option = styled(ThrottleTouchableOpacity)`
  height: 50;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: ${sizes.marginDefault};
  margin-right: ${sizes.marginDefault};
  border-bottom-width: 1;
  border-bottom-color: ${colors.borderLight};
`;

const OptionText = styled.Text`
  color: ${props => (props.active ? colors.primaryRed : colors.primaryLight)};
  font-size: ${sizes.fontSmall};
  line-height: 48;
  text-align: left;
`;
