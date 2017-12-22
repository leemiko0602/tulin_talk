import React from 'react';
import styled from 'styled-components/native';
import StartRating from 'react-native-star-rating';

import ThrottleTouchableOpacity from '../../../Components/ThrottleTouchableOpacity';

import { colors, sizes, feedbacks } from '../../../Data/constants';

export default ({ options, current, onChoose }) =>
  <Container>
    {options.map(x =>
      <Option key={x.value} activeOpacity={feedbacks.activeOpacity} onPress={() => onChoose(x.value)}>
        {x.value !== 0 &&
          <OptionStar
            disabled={true}
            maxStars={5}
            rating={Number(x.value.split('~').pop())}
            starSize={15}
            starColor={colors.primaryRed}
            starStyle={{ marginLeft: 3 }}
          />}
        <OptionText simple={x.value === 0} active={x.value === current}>{x.label}</OptionText>
      </Option>
    )}
  </Container>;

const Container = styled.View`
  height: 100%;
`;

const Option = styled(ThrottleTouchableOpacity)`
  height: 50;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${sizes.marginDefault};
  margin-right: ${sizes.marginDefault};
  border-bottom-width: 1;
  border-bottom-color: ${colors.borderLight};
`;

const OptionStar = styled(StartRating)`
  margin-top: ${sizes.marginDefault};
  margin-bottom: ${sizes.marginDefault};
`;

const OptionText = styled.Text`
  margin-left: ${props => (props.simple ? 0 : sizes.marginSmall)};
  color: ${props => (props.active ? colors.primaryRed : colors.primaryLight)};
  font-size: ${sizes.fontSmall};
  line-height: 48;
  text-align: left;
`;
